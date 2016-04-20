# Intelligent SMS Bot via Burner, Slack, and Api.ai

By making use of [Burner's Slack connection](http://www.burnerapp.com/slack/) and [Api.ai's Slack integration](https://docs.api.ai/docs/slack-integration), you can easily create an intelligent SMS bot.


![burner api-ai slackbot mp4](https://cloud.githubusercontent.com/assets/2220/13895572/a82a92ba-ed42-11e5-8960-8dc91471d64a.gif)

What's happening above:

* A user sends a text to our Burner line.
* The Burner Slack connection posts the SMS in our Slack channel.
* Our slackbot receives the SMS, parses out the sending phone number and message, and passes the message on to our Api.ai agent.
* Our Api.ai agent sends back a response, which our slackbot duly posts in the Slack channel, prepended with the phone number that sent the SMS, ensuring that our response gets sent back to the correct user.
* The Burner Slack connection sends an SMS back to the user.

## Getting started

1. [Create an Api.ai agent.](https://docs.api.ai/docs/get-started#step-1-create-agent)
2. [Activate the general knowledge domain for your agent.](https://docs.api.ai/docs/domains)
3. [Obtain your Api.ai authentication keys.](https://docs.api.ai/docs/authentication)
4. [Create a new slackbot.](https://slack.com/apps/A0F7YS25R-bots) Remember the name of the bot, as you'll need this later.
5. [Obtain your Slackbot's API token.](https:/lslack.com/apps/manage/A0F7YS25R-bots)
6. [Enable the Slack connection for your Burner line.](http://www.burnerapp.com/slack/) **Note:** You will need to invite the `burnerbot` Slackbot to the Slack channel in which you have activated the Burner connection.
7. Click the handy "Deploy to Heroku" button below to deploy the bot to Heroku.

	[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

8. Enter the credentials you gathered above in the "New App" screen and click the "Create App" button.

You're all set! Try texting a question to your Burner line, and you should get a response.

## Creating a human-assisted AI SMS support bot

Using the [Api.ai General Knowledge domain](https://docs.api.ai/docs/domains) to give your agent the ability to engage in small talk or tell you about the weather is all well and good, but Api.ai really shines when you use its interface to add new capabilities to your agent. By using [intents](https://docs.api.ai/docs/concept-intents) to represent questions you frequently recieve from customers, you can easily create an SMS support bot, powered by human-assisted AI!

### Adding questions

We'll use *intents* within Api.ai to represent questions your customers might ask. An intent maps what is said by a user to what should happen in response - in this case, the agent should provide an answer to one of our Frequently Asked Questions.

Head back to [your Api.ai workspace](https://console.api.ai/api-client/#/agents), and select the agent you created earlier from the list. Select the "Intents" option in the menu on the left-hand side, then click the blue "Create Intent" button at the top of the screen.

In the "User says" section, start by adding a question from your FAQ, and press return. You'll notice that the name of the intent at the top will become the first question you entered. On the next line, add another way that someone might phrase that same question, and press return again. Continue this process, adding several different phrasings of the same question, then press the blue "Save" button up at the top. You should have something like the following:

<div style='text-align:center;'><img title="Example of user utterances" src="https://cloud.githubusercontent.com/assets/2220/14662576/1b2b143a-067d-11e6-8b76-ac0ac23538a4.png" /></div>

## Adding answers

Skip down to the "Speech Response" section (the "Action" section isn't relevant to what we're building). This is where you'll specify the answer to a question:

<div style='text-align:center;'><img title="Example of answers" src="https://cloud.githubusercontent.com/assets/2220/14662662/078279fe-067e-11e6-8923-8963433bba56.png" /></div>

You'll notice that, as in the "User says" section, you're able to add a number of responses. If you'd like, you can specify several different versions of the same answer to a question, and Api.ai will randomly select one of them as the response. This is [a technique for making your bot seem more intelligent](https://medium.com/building-the-robot-assistant/cheating-on-the-turing-test-bc23a36db10#.vnd2gifjz).

## Testing your agent

Click on the grey box in the upper-right-hand corner that says "Try it now..." This is the test console, where you can enter a question you might receive from a custom to see how Api.ai handles it:

<div style='text-align:center;'><img title="Developer console" src="https://cloud.githubusercontent.com/assets/2220/14662755/ee926836-067e-11e6-85ba-f99dfb51fc2f.png" /></div>

After you enter (or speak, if you're in Chrome) a question, you can see how your agent handles it. The "Speech Response" section shows us what will be texted back to your customer by the bot, and the "Intent" section shows us which question the agent understood was being asked.

Notice that, even though the test question was slightly different than any of the examples we provided in the "User Says" section, Api.ai's machine learning was intelligent enough to correctly understand what was being asked. The more examples you provide in the "User Says" section, the better the chance of the question being understood by your agent.

## Filling in the gaps

You can repeat this process for as many questions as you would like: adding a new question, adding different versions of the question, adding answers, and testing the agent. Each question you add will save you time the next time that it's asked and then answered automatically. Leave the robot work to the robots.

Inevitably, though, you'll receive a question that won't be understood. In that case, you'll recieve an announcement in your Slack channel:

<div style='text-align:center;'><img title="Slack announcement" src="https://cloud.githubusercontent.com/assets/2220/14662906/6b406a62-0680-11e6-9645-39bce5f2230c.png" /></div>

Humans to the rescue! At this point, your team can respond to the announcement and step in to save the day with the appropriate information for your customer. Just cut and paste the provided slash command, add the correct answer to the customer's query, and Burner will take care of zipping that fresh info back over to your customer as an SMS.

<div style='text-align:center;'><img title="Example of bot in action" src="https://cloud.githubusercontent.com/assets/2220/14663594/53aa7976-0688-11e6-856f-8203ec9d4e00.png" /></div>

That's called *human-assisted artificial intelligence.* And you did it all [without a $300 billion market cap](http://www.buzzfeed.com/alexkantrowitz/time-to-meet-the-wizard-facebooks-messenger-head-pulls-back#.ohOwdqQVjo)!

## Credits

<div style='text-align:center;'><img title="Voxable logo" src="https://cloud.githubusercontent.com/assets/2220/14663745/8b5688dc-0689-11e6-95b9-7765fa59128e.png" /></div>

This is a fork of [Api.ai's Slack integration](https://github.com/api-ai/api-ai-slack-bot), with [minimal modifications](https://github.com/voxable-labs/burner-sms-api-ai-slackbot/pull/1/files#diff-1fdf421c05c1140f6d71444ea2b27638) needed to make the magic happen with Burner. Brought to you by the good folks at [Voxable](https://voxable.io), who always stand ready to [help you give voice to your product](http://voxable.io/hire-us), in collaboration with the stellar team at [Burner](http://www.burnerapp.com/).


