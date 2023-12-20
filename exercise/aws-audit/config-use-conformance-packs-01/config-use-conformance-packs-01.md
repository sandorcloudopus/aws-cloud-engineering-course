# AWS Config  - Deploy and Use Conformance Packs
- An AWS Config conformance pack is a collection of AWS Config rules and remediation actions that can be easily deployed as a single entity in an account and a Region or across an organization in AWS Organizations.
- The Purpose of this exercise is to get to know AWS Config Conformance packs, and get some idea how you can take advantage of them when it comes to configuration management.

## Exercise Requirements
1. Enable AWS Config
    1. Make sure that Don't enable on all resources. Select only couple of EC2 Resources - Because it can add up in the aspects of pricing!!!
1. Deploy a `Conformance Pack` - Select from an already existing one! like `Operational Best Practices for EC2`
1. Deploy Couple of Resources - see the result
1. Clean Up
    1. Delete the Conformance Pack
    1. Turn off the Recorder
    1. Clean up the Recorder `aws configservice delete-configuration-recorder --configuration-recorder-name default --region eu-central-1`
    1. Clean up the IAM Roles of Config

## Quick Overview
![AWS Config use Conformance Packs](./config-use-conformance-packs-01.png)


## Resources
1. [Operational Best Practices for EC2](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-EC2.html)
1. [Operational Best Practices for EC2 - CloudFormation Template](https://github.com/awslabs/aws-config-rules/blob/master/aws-config-conformance-packs/Operational-Best-Practices-for-EC2.yaml)
1. [How to Disable AWS Config from a Region](https://repost.aws/questions/QUbzk1cn5jTr6vSc3FyGBkPw/help-how-do-you-turn-off-aws-config)