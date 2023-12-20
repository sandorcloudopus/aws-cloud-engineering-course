# AWS GuardDuty - Single Region / Foundational Data Sources
- The Purpose of this exercise is to discover the capabilities of AWS GuardDuty. Enabling the Foundational Data Sources and generating security findings gives you a great overview of this fantastic security service.
- Amazon GuardDuty is a security monitoring service that analyzes and processes different data sources, it is an Intelligent Threat Detection Service.

- If you use AWS DNS resolvers for your Amazon EC2 instances (the default setting), then GuardDuty can access and process your request and response DNS logs through the internal AWS DNS resolvers.
- When you enable GuardDuty, it immediately starts analyzing your VPC flow logs from Amazon EC2 instances within your account. It consumes VPC flow log events directly from the VPC Flow Logs feature through an independent and duplicative stream of flow logs.
- GuardDuty monitorrs the AWS CloudTrail event logs, management events, global events. 

## Exercise
1. Enable GuardDuty within a single Region
    1. apply only for foundational data sources
    1. need to disable the "extra protections"
1. Generate Example events
1. Check the Different Finding Types
1. BONUS! - Generate Findings Manually
1. Disable GuardDuty

## Quick Overview
![AWS GuardDuty - Single Region / Foundational Data Sources](./guardduty-single-region-foundational-01.png)

## Tips and Tricks
#### Triggering Policy:IAMUser/RootCredentialUsage Finding
1. Log in to the AWS Account with the Root User Credentials

## Resources
1. [AWS GuardDuty Foundational Data Sources](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_dns)
1. [Finding Types](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html)