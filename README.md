# Intelligent SMS bot via Burner, Slack, and Api.ai

## Overview

By making use of [Burner's Slack connection](http://www.burnerapp.com/slack/) and [Api.ai's Slack integration](https://docs.api.ai/docs/slack-integration), you can easily create an intelligent SMS bot.


![burner api-ai slackbot mp4](https://cloud.githubusercontent.com/assets/2220/13895572/a82a92ba-ed42-11e5-8960-8dc91471d64a.gif)

What's happening above:

* A user sends a text to our Burner line.
* The Burner Slack connection posts the SMS in our Slack channel.
* Our slackbot receives the SMS, parses out the sending phone number and message, and passes these on to our Api.ai agent.
* Our Api.ai agent sends back a response, which our slackbot duly posts in the Slack channel, prepended with the number that sent the SMS.
* The Burner Slack connection sends an SMS back to the user.

## Getting Started

1. [Create an Api.ai agent.](https://docs.api.ai/docs/get-started#step-1-create-agent)
2. [Activate the general knowledge domain for your agent.](https://docs.api.ai/docs/domains)
3. [Obtain your Api.ai authentication keys.](https://docs.api.ai/docs/authentication)
4. [Create a new slackbot.](https://slack.com/apps/A0F7YS25R-bots)
5. [Obtain your Slackbot's API token.](https:/lslack.com/apps/manage/A0F7YS25R-bots)
6. [Enable the Slack connection for your Burner line.](http://www.burnerapp.com/slack/)
7. Click the handy "Deploy to Heroku" button below to deploy the bot to Heroku.

	[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

8. Enter the credentials you gathered above in the "New App" screen and click the "Create App" button.

You're all set! Try texting a question to your Burner line, and you should get a response.

## Credits

This is a fork of [Api.ai's Slack integration](https://github.com/api-ai/api-ai-slack-bot), with [minimal modifications](https://github.com/voxable-labs/burner-sms-api-ai-slackbot/pull/1/files#diff-1fdf421c05c1140f6d71444ea2b27638) needed to make the magic happen with Burner.