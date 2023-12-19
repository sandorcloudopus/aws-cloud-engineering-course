# AWS EC2 - Creating a Custom EBS-backed Linux AMI
- To create an Amazon EBS-backed Linux AMI, start from an instance that you've launched from an existing Amazon EBS-backed Linux AMI. This can be an AMI you have obtained from the AWS Marketplace, an AMI you have created 
- The purpose of this exercise is to demonstrate how to create a Custom AMI, with a custom software installed on it

## Requirements
- Create an AMI with CloudWatch Agent Installed/Enabled/Configured on it
- Also Install Node.js v20
- Create an AMI
- Create an IAM Policy which deny users to launch instances with other AMI than you have created
- Create a TEST User
- Launch an Instance with the TEST User using the custom AMI

## Desired Architecture
![ec2-custom-ami](./ec2-custom-ami-01.png)

### Tips and Tricks
#### Installing CloudWatch Agent
- Downloading the `CW agent`-> 

    `wget https://amazoncloudwatch-agent.s3.amazonaws.com/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb`
- Installing the `CW Agent` -> 

    `sudo dpkg -i -E ./amazon-cloudwatch-agent.deb`
- Using `CW Agent` config wizard -> 

    `sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard`
- Starting the `CW Agent` -> 

    `sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:<config file path>`

#### Deny Policy - Deny Instance Launch if it is not using the "Golden AMI"

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DenyRunningOtherThanGoldenAMIs",
            "Effect": "Deny",
            "Action": "ec2:RunInstances",
            "Resource": [
                "arn:aws:ec2:eu-central-1::image/*"
            ],
            "Condition": {
                "StringNotEquals": {
                    "ec2:ImageID": "<golden-ami-image-id (not arn)"
                }
            }
        }
    ]
}
```
## Resources
- [Installing Node.js on Ubuntu from source](https://github.com/nodesource/distributions/blob/master/README.md#ubuntu-versions)
- [Installing CloudWatch Agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-commandline-fleet.html)
- [Restrict Users Launching Different types of AMIs](https://repost.aws/questions/QUVWY7e90vQ_epMjugk5C3pA/how-do-you-restrict-ami-use-with-iam-using-deny-and-notresource)
- [Create an Amazon EBS-backed Linux AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-an-ami-ebs.html)
