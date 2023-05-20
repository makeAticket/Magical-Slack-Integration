# Magical Slack Integration
 
This repository contains a prototype for integrating with Slack using Node.js. The application allows you to send messages to channels and convert raw data to Slack-formatted messages.

## Prerequisites

- Node.js (version X.X.X or higher)
- npm (version X.X.X or higher)
- Access to a Slack workspace with a Slack app

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/slack-integration-prototype.git
   ```

2. Install the dependencies:

   ```bash
   cd slack-integration-prototype
   npm install
   ```

3. Configure the environment variables:

   - Create a new `.env` file in the root directory.
   - Add the following environment variables to the file:

     ```dotenv
     SLACK_CLIENT_ID=5296783228034.5296654907875
     SLACK_CLIENT_SECRET=423f05bdb0b6baa6bf8399fa4d778405
     SLACK_REDIRECT_URI=https://dalton.ngrok.io/oauth_redirect
     ```

4. Start the server:

   ```bash
   node index.js
   ```

5. Open your web browser and visit `https://dalton.ngrok.io` to access the application.

## Usage

1. Connect your Slack account:
   - Click on the "Connect to Slack" button on the homepage.
   - You will be redirected to authorize the app for your Slack workspace.
   - After authorization, you will be redirected back to the application.

2. Send messages to Slack channels:
   - Go to the "Upload" page.
   - Select a Slack channel from the dropdown.
   - Enter the message content in the text area. Here is an example I created using Magical's AI notes tool for 'Tesla's 2023 Earnings':
```json
[
    {
        "type": "heading",
        "attrs": {
            "level": 2
        },
        "content": [
            {
                "text": "Meeting Notes: Tesla's Business Plan for Q22023",
                "type": "text"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "📅 Date: [Insert Date]",
                "type": "text"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "🕒 Time: [Insert Time]",
                "type": "text"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "📌 Location: [Insert Location]",
                "type": "text"
            }
        ]
    },
    {
        "type": "heading",
        "attrs": {
            "level": 3
        },
        "content": [
            {
                "text": "Agenda",
                "type": "text"
            }
        ]
    },
    {
        "type": "bulletList",
        "content": [
            {
                "type": "listItem",
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "text": "Review of Q12023 Performance",
                                "type": "text"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "type": "bulletList",
        "content": [
            {
                "type": "listItem",
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "text": "Update on Production Targets",
                                "type": "text"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "type": "bulletList",
        "content": [
            {
                "type": "listItem",
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "text": "Marketing and Sales Strategy",
                                "type": "text"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "type": "bulletList",
        "content": [
            {
                "type": "listItem",
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "text": "Financial Projections and Budget",
                                "type": "text"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "type": "heading",
        "attrs": {
            "level": 3
        },
        "content": [
            {
                "text": "Review of Q12023 Performance",
                "type": "text"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "📊 Tesla's Q12023 performance was impressive with an increase in the number of units sold and revenue generated. However, there were some challenges faced by the company such as supply chain disruptions and regulatory changes.",
                "type": "text"
            }
        ]
    },
    {
        "type": "heading",
        "attrs": {
            "level": 3
        },
        "content": [
            {
                "text": "Update on Production Targets",
                "type": "text"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "🚀 Tesla is on track to achieve its production targets for Q22023. The company is focusing on ramping up production of its electric vehicles and expanding its manufacturing facilities in different regions.",
                "type": "text"
            }
        ]
    },
    {
        "type": "heading",
        "attrs": {
            "level": 3
        },
        "content": [
            {
                "text": "Marketing and Sales Strategy",
                "type": "text"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "📈 Tesla's marketing and sales strategy for Q22023 is centered on expanding its customer base and increasing brand awareness. The company plans to launch new models and introduce innovative features to attract more customers.",
                "type": "text"
            }
        ]
    },
    {
        "type": "heading",
        "attrs": {
            "level": 3
        },
        "content": [
            {
                "text": "Financial Projections and Budget",
                "type": "text"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "💰 Tesla's financial projections for Q22023 are positive, with an expected increase in revenue and profits. The company has allocated a significant budget to research and development, marketing, and expansion of its operations.",
                "type": "text"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "👍 Overall, Tesla's business plan for Q22023 looks promising, and the company is focused on achieving its goals and objectives.",
                "type": "text"
            }
        ]
    }
]
```
   - Click the "Send Message" button.
   - The message will be sent to the selected Slack channel.

## File Structure

- `index.js`: The main server file that handles the routes and Slack API integration.
- `views/index.pug`: The Pug template for the homepage.
- `views/upload.pug`: The Pug template for the upload page.