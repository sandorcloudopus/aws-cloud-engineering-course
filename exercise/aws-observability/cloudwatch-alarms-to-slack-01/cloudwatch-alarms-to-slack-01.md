# AWS CloudWatch - Send Alarms to Slack Channel
- The purpose of this exercise is to demonstrate how to send AWS Alerts to 3rd party software. Slack is one of the most popular collaboration tool. Sending alerts to slack is an appropriate method to continuously monitor alarm states.

## Exercise Requirements
1. Configure Slack Application and Webhook URL
1. Create a `Custom Alert` that you can trigger
1. Create an SNS Topic
1. Create a Lambda which Subscribes to the SNS Topic and sends message to Slack using the Webhook URL
1. Configure the `Custom Alert` Notifications to send notification to the SNS Topic
1. Wait for the Slack Message
1. Clean Up! Don't Forget to Delete the Resources!

## Quick Overview
![AWS CloudWatch - Send Alarms to Slack Channel](./cloudwatch-alarms-to-slack0-01.png)

## Tips and Tricks
#### Installing `stress-ng` and running
`sudo dnf install stress-ng`
`stress-ng --cpu 4 --timeout 120s`


#### Lambda Function to Send to SLACK
```py
import json
import logging
import os

from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

SLACK_CHANNEL = os.environ['SLACK_CHANNEL']
HOOK_URL = os.environ['HOOK_URL']

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logger.info("Event: " + str(event))
    message = json.loads(event['Records'][0]['Sns']['Message'])
    logger.info("Message: " + str(message))

    alarm_name = message['AlarmName']
    new_state = message['NewStateValue']
    reason = message['NewStateReason']

    slack_message = {
        'channel': SLACK_CHANNEL,
        'text': ":warning: *%s* ALARM has transitioned to *%s* state, The reason is the following:  %s" % (alarm_name, new_state, reason)
    }

    req = Request(HOOK_URL, json.dumps(slack_message).encode('utf-8'))
    try:
        response = urlopen(req)
        response.read()
        logger.info("Message posted to %s", slack_message['channel'])
    except HTTPError as e:
        logger.error("Request failed: %d %s", e.code, e.reason)
    except URLError as e:
        logger.error("Server connection failed: %s", e.reason)
```

## Resources
1. [Configure Slack Application and Webhook URL](https://api.slack.com/messaging/webhooks)
1. [SNS - Lambda - CloudWatch Alarms](https://repost.aws/knowledge-center/sns-lambda-function-cloudwatch-alarm)
1. [stress-ng](https://github.com/ColinIanKing/stress-ng)