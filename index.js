const express = require('express');
const axios = require('axios');
const open = require('open');
const fs = require('fs');
require('dotenv').config();

const { WebClient } = require('@slack/web-api');

const app = express();
const port = process.env.PORT || 80;

// Slack API configuration
const slackClientId = process.env.SLACK_CLIENT_ID;
const slackClientSecret = process.env.SLACK_CLIENT_SECRET;
const slackRedirectUri = process.env.SLACK_REDIRECT_URI;
let slackWebClient;
if (process.env.SLACK_TOKEN) slackWebClient = slackWebClient = new WebClient(process.env.SLACK_TOKEN);

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'pug');

// Routes
app.get('/', (req, res) => {
    res.render('index');
  });

app.get('/connect', async (req, res) => {
  try {
    // Redirect the user to the Slack authorization page
    const authorizeUrl = `https://slack.com/oauth/v2/authorize?client_id=${slackClientId}&scope=channels:read,im:read,groups:read,mpim:read,chat:write,chat:write.public&redirect_uri=${slackRedirectUri}`;
    res.redirect(authorizeUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while initiating Slack authorization.');
  }
});

app.get('/oauth_redirect', async (req, res) => {
    const { code } = req.query;
  
    try {
      // Exchange the code for a Slack token
      const response = await axios.post('https://slack.com/api/oauth.v2.access', {
        code,
        client_id: slackClientId,
        client_secret: slackClientSecret,
        redirect_uri: slackRedirectUri
      },
      {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      const { data } = response;
  
      if (!data.ok) {
        console.error(data);
        throw new Error('An error occurred during Slack authentication.');
      }
  
      // Save the Slack token if empty in dotenv
      const slackToken = data.access_token;
  
      // Initialize the Slack client with the Slack token
      slackWebClient = new WebClient(slackToken);
  
      if (!process.env.SLACK_TOKEN) {
        console.log(`SLACK_TOKEN=${slackToken}`);
        fs.appendFileSync('.env', `\nSLACK_TOKEN=${slackToken}`);
      }
  
      res.redirect('/upload');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred during Slack authentication.');
    }
  });
  

app.get('/upload', async (req, res) => {
    try {
      // Ensure that the slackWebClient is initialized with the Slack token
      if (!slackWebClient) {
        return res.status(500).send('Slack client is not initialized.');
      }
  
      const result = await slackWebClient.conversations.list();
      const channels = result.channels.map(channel => channel.name);
      res.render('upload', { channels });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while trying to fetch channels.');
    }
  });
  

app.post('/upload', async (req, res) => {
  const { channel, message } = req.body;

  try {
    // Convert the raw data to a formatted string IF JSON
    const formattedData = convertToSlackFormat(message);

    // Send the formatted data as a message to the specified Slack channel
    await slackWebClient.chat.postMessage({
      channel,
      text: formattedData
    });

    res.send('Message sent!');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to send a message to Slack.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Utility function to convert raw data to Slack format
function convertToSlackFormat(data) {
  try{
    data = JSON.parse(data);

    let formattedString = '';

    for (const item of data) {
      if (item.type === 'heading') {
        formattedString += `*${item.content[0].text}*\n\n`;
      } else if (item.type === 'paragraph') {
        formattedString += `${item.content[0].text}\n\n`;
      } else if (item.type === 'bulletList') {
        for (const listItem of item.content) {
          formattedString += `• ${listItem.content[0].content[0].text}\n`;
        }
        formattedString += '\n';
      }
    }
  
    return formattedString;
  }
  catch(err){
    return data;
  }
}