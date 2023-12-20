# AWS VPC - Enable VPC Flow Logs and Publish to CloudWatch
- VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC. Flow log data can be published to the following locations: Amazon CloudWatch Logs, Amazon S3, or Amazon Kinesis Data Firehose.
- The purpose of this exercise is to demonstrate how to stream VPC Flow logs to AWS CloudWatch. Storing Logs in AWS CloudWatch also gives you the option to run advanced queries.

## Exercise Requirements
1. Create a VPC or Use the Default VPC
1. Enable VPC Flow logs for the VPC
    1. Store the logs using AWS CloudWatch
1. Query the logs
1. Clean Up! Don't Forget to Delete the Resources!

## Tips and Tricks
#### Create an IAM Role for the VPC-FLOW-LOG-SERVICE with the policy of the following

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Resource": "*"
    }
  ]
}   
```

#### and use the following assumeRolePolicy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "vpc-flow-logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
} 
```
#### Optionally you can add this snippet to the assumeRolePolicy for preventing confused deputy problem
```json
"Condition": {
    "StringEquals": {
        "aws:SourceAccount": "account_id"
    },
    "ArnLike": {
        "aws:SourceArn": "arn:aws:ec2:region:account_id:vpc-flow-log/flow-log-id"
    }
}
```

## Resources
1. [Publish logs to CloudWatch](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-cwl.html#process-records-cwl)