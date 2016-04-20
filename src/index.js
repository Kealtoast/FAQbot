// Module must be started with environment variables
//
//  accesskey="api.ai client access key"
//  subscriptionkey="api.ai subscription key"
//  slackkey="slack bot key"
//

'use strict';

const Botkit = require('botkit');

const apiai = require('apiai');
const uuid = require('node-uuid');

const http = require('http');

const Entities = require('html-entities').XmlEntities;
const decoder = new Entities();

const apiAiAccessToken = process.env.accesstoken;
const apiAiSubscriptionKey = process.env.subscriptionkey;
const slackBotKey = process.env.slackkey;

const apiAiService = apiai(apiAiAccessToken, apiAiSubscriptionKey);

var sessionIds = {};

const controller = Botkit.slackbot({
    debug: false
    //include "log: false" to disable logging
});

var bot = controller.spawn({
    token: slackBotKey
}).startRTM();

function isDefined(obj) {
    if (typeof obj == 'undefined') {
        return false;
    }

    if (!obj) {
        return false;
    }

    return obj != null;
}

controller.hears(['.*'], ['bot_message'], function (bot, message) {

    try {
        if (message.type == 'message') {
            if (message.user == bot.identity.id) {
                // message from bot can be skipped
            }
            else if (message.text.indexOf("<@U") == 0 && message.text.indexOf(bot.identity.id) == -1) {
                // skip other users direct mentions
            }
            else if (message.text.includes("Sent text to")) {
                // skip sent text confirmations from Burner
                console.log('Skipping Burner response.');
            }
            else {

                var requestText = decoder.decode(message.text);
                requestText = requestText.replace("’", "'");

                var burnerMessageRegex = /Inbound message from \+(\d*):\s(.*)/;
                var returnNumber = '';
                var smsMessage;

                // Parse the SMS message and return number out of Burner's slackbot message
                if ((smsMessage = burnerMessageRegex.exec(requestText)) !== null) {
                    returnNumber = '@' + smsMessage[1];
                    requestText = smsMessage[2];

                    console.log('returnNumber', returnNumber);
                    console.log('requestText', requestText);
                } else {
                    // If message pattern is not matched, exit and ignore the message.
                    return null;
                }

                var channel = message.channel;
                var messageType = message.event;
                var botId = "<@" + bot.identity.id + ">";

                console.log(messageType);

                if (requestText.indexOf(botId) > -1) {
                    requestText = requestText.replace(botId, '');
                }

                if (!(channel in sessionIds)) {
                    sessionIds[channel] = uuid.v1();
                }

                var request = apiAiService.textRequest(requestText,
                    {
                        sessionId: sessionIds[channel]
                    });

                request.on('response', function (response) {
                    console.log('response', response);

                    if (isDefined(response.result)) {
                        // Message everyone in the channel if the question was not answered by the
                        // Api.ai agent.
                        if ( response.result.fulfillment.speech === '' ) {
                            var responseText = '<!channel> The Api.ai agent encountered a request' +
                              ' it could not answer. Simply prepend a message with `/burner text ' +
                              returnNumber + '` to reply to the unanswered request.';
                        // Otherwise, the question was answered, so send an SMS response.
                        } else {
                            // Preface the response with the appropriate return SMS number.
                            var responseText = returnNumber + ' ' + response.result.fulfillment.speech;
                        }

                        bot.reply( message, responseText, function( err, resp ) {
                            console.log( err, resp );
                        } );
                    }
                });

                request.on('error', function (error) {
                    console.error(error);
                });

                request.end();
            }
        }
    } catch (err) {
        console.error(err);
    }

});


//Create a server to prevent Heroku kills the bot
var server = http.createServer(function (req, res) {
    res.end()
});

//Lets start our server
server.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});