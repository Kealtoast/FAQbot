![FAQbot logo](https://cloud.githubusercontent.com/assets/2220/15912502/ba18c5fa-2da2-11e6-8494-2604601e4082.png)

# FAQbot: An intelligent SMS Bot via Burner, Slack, and Api.ai

By making use of [Burner's Slack connection](http://www.burnerapp.com/slack/) and [Api.ai's Slack integration](https://docs.api.ai/docs/slack-integration), you can easily create an intelligent SMS bot to answer your customers' FAQ (and heck, even some general knowledge questions and smalltalk): **FAQbot**! Never fear: if FAQbot can't answer a question, it will dutifully ask your team to step in to help.

![burner api-ai slackbot mp4](https://cloud.githubusercontent.com/assets/2220/13895572/a82a92ba-ed42-11e5-8960-8dc91471d64a.gif)

What's happening above:

* A user sends a text to our Burner line.
* The Burner Slack connection posts the SMS in our Slack channel.
* Our slackbot receives the SMS, parses out the sending phone number and message, and passes the message on to our Api.ai agent.
* Our Api.ai agent sends back a response, which our slackbot duly posts in the Slack channel, prepended with the phone number that sent the SMS, ensuring that our response gets sent back to the correct user.
* The Burner Slack connection sends an SMS back to the user.

## Prerequisites

You’ll need 2 keys:

- Client access token for Api.ai
- Slack bot API token

Before you begin, you'll need:

1. [A Burner account](https://burnerapp.com) and at least 1 phone number. (Free + Trial)
2. [Access to a Slack team](https://slack.com) and at least 1 phone number. (Free)
3. [An Api.ai account](https://api.ai) and at least 1 phone number. (Free)
4. [A Heroku account](https://heroku.com) and at least 1 phone number. (Free)

Don't worry if you don't have one or more of those accounts yet, you can always create them as you go through the setup flow below.

## Getting started

1. [Create an Api.ai agent.](https://docs.api.ai/docs/get-started#step-1-create-agent)
2. [Activate the Wisdom and Smalltalk domains for your agent.](https://docs.api.ai/docs/domains)
3. [Obtain your Api.ai authentication keys.](https://docs.api.ai/docs/authentication)
4. [Create a new slackbot.](https://slack.com/apps/A0F7YS25R-bots) Remember the name of the bot, as you'll need this later.
5. [Obtain your Slackbot's API token.](https:/slack.com/apps/manage/A0F7YS25R-bots)
6. [Enable the Slack connection for your Burner line.](http://www.burnerapp.com/slack/)
7. In Slack, invite @burnerbot and the @bot you created in step 4 to the channel you connected your Burner to in step 6.
7. Click the handy "Deploy to Heroku" button below to deploy the bot to Heroku.

	[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

8. Enter the credentials you gathered above in the "New App" screen and click the "Create App" button.

You're all set! Try texting a question to your Burner line, and you should get a response.

## Ugh, I don't wanna

Don't feel like building this yourself? Think we at Voxable should just stop lollygagging and turn this into a product, already? [Drop us a line](http://voxable.io/hire-us) and let usk now!

## Creating a human-assisted AI SMS support bot

Using the [Api.ai General Knowledge domain](https://docs.api.ai/docs/domains) to give FAQbot the ability to engage in small talk or tell you about the weather is all well and good, but Api.ai really shines when you use its interface to add new capabilities to your "agent." By using [intents](https://docs.api.ai/docs/concept-intents) to represent questions you frequently recieve from customers, you can easily create an SMS support bot, powered by human-assisted AI!

### Adding questions

We'll use *intents* within Api.ai to represent questions your customers might ask. An intent maps what is said by a user to what should happen in response - in this case, the agent should provide an answer to one of our Frequently Asked Questions.

Head back to [your Api.ai workspace](https://console.api.ai/api-client/#/agents), and select the agent you created earlier from the list. Select the "Intents" option in the menu on the left-hand side, then click the blue "Create Intent" button at the top of the screen.

In the "User says" section, start by adding a question from your FAQ, and press return. You'll notice that the name of the intent at the top will become the first question you entered. On the next line, add another way that someone might phrase that same question, and press return again. Continue this process, adding several different phrasings of the same question, then press the blue "Save" button up at the top. You should have something like the following:

<p align="center"><img title="Example of user utterances" src="https://cloud.githubusercontent.com/assets/2220/14662576/1b2b143a-067d-11e6-8b76-ac0ac23538a4.png" /></p>

## Adding answers

Skip down to the "Speech Response" section (the "Action" section isn't relevant to what we're building). This is where you'll specify the answer to a question:

<p align="center"><img title="Example of answers" src="https://cloud.githubusercontent.com/assets/2220/14662662/078279fe-067e-11e6-8923-8963433bba56.png" /></p>

You'll notice that, as in the "User says" section, you're able to add a number of responses. If you'd like, you can specify several different versions of the same answer to a question, and Api.ai will randomly select one of them as the response. This is [a technique for making your bot seem more intelligent](https://medium.com/building-the-robot-assistant/cheating-on-the-turing-test-bc23a36db10#.vnd2gifjz).

## Testing your agent

Click on the grey box in the upper-right-hand corner that says "Try it now..." This is the test console, where you can enter a question you might receive from a customer to see how Api.ai handles it:

<p align="center"><img title="Developer console" src="https://cloud.githubusercontent.com/assets/2220/14662755/ee926836-067e-11e6-85ba-f99dfb51fc2f.png" /></p>

After you enter (or speak, if you're in Chrome) a question, you can see how your agent handles it. The "Speech Response" section shows us what will be texted back to your customer by the bot, and the "Intent" section shows us which question the agent understood was being asked.

Notice that, even though the test question was slightly different than any of the examples we provided in the "User Says" section, Api.ai's machine learning was intelligent enough to correctly understand what was being asked. The more examples you provide in the "User Says" section, the better the chance of the question being understood by your agent.

## Filling in the gaps

You can repeat this process for as many questions as you would like: adding a new question, adding different versions of the question, adding answers, and testing the agent. Each question you add will save you time the next time that it's asked and then answered automatically. Leave the robot work to the robots.

Inevitably, though, you'll receive a question that FAQbot won't understand. In that case, you'll recieve an announcement in your Slack channel:

<p align="center"><img title="Slack announcement" src="https://cloud.githubusercontent.com/assets/2220/14662906/6b406a62-0680-11e6-9645-39bce5f2230c.png" /></p>

Humans to the rescue! At this point, your team can respond to the announcement and step in to save the day with the appropriate information for your customer. Just cut and paste the provided slash command, add the correct answer to the customer's query, and Burner will take care of zipping that fresh info back over to your customer as an SMS.

<p align="center"><img title="Example of bot in action" src="https://cloud.githubusercontent.com/assets/2220/14663594/53aa7976-0688-11e6-856f-8203ec9d4e00.png" /></p>

That's called *human-assisted artificial intelligence.* And you did it all [without a $300 billion market cap](http://www.buzzfeed.com/alexkantrowitz/time-to-meet-the-wizard-facebooks-messenger-head-pulls-back#.ohOwdqQVjo)!

## Credits

<p align="center"><a href="https://voxable.io"><img title="Voxable logo" src="https://cloud.githubusercontent.com/assets/2220/14663745/8b5688dc-0689-11e6-95b9-7765fa59128e.png" /></a></p>

This is a fork of [Api.ai's Slack integration](https://github.com/api-ai/api-ai-slack-bot), with [minimal modifications](https://github.com/voxable-labs/burner-sms-api-ai-slackbot/pull/1/files#diff-1fdf421c05c1140f6d71444ea2b27638) needed to make the magic happen with Burner. Brought to you by the good folks at [Voxable](https://voxable.io), who always stand ready to [help you give voice to your product](http://voxable.io/hire-us), in collaboration with the stellar team at [Burner](http://www.burnerapp.com/).


