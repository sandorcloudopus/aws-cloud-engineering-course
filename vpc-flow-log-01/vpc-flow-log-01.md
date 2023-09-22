# Creating VPC Flow Logs and Publishing to CloudWathc

https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-cwl.html#process-records-cwl

1. Create an IAM Role for the VPC-FLOW-LOG-SERVICE with the policy of the following

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

and use the following assumeRolePolicy

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

Optionally you can add this snippet to the assumeRolePolicy for preventing confused deputy problem

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
