# AWS EC2 EBS - Enforce EBS Volume Encryption on EC2 Instance Creation and on Volume Creation
- The purpose of this excercise to show how to enforce EC2 EBS Volume Encryption on Volume creation.

## Requirements
- Create an IAM Policy (which can be attached to Group or User or any Principal) with enforce EBS Volume Creation with Encryption Logic

## Tips and Tricks
#### Enforce EBS Volume Creation Policy

```json
{
  "Effect": "Deny",
  "Action": "ec2:CreateVolume",
  "Resource": "*",
  "Condition": {
    "Bool": {
      "ec2:Encrypted": "false"
    }
  }
},
{
  "Effect": "Deny",
  "Action": "ec2:RunInstances",
  "Resource": "arn:aws:ec2:*:*:volume/*",
  "Condition": {
    "Bool": {
      "ec2:Encrypted": "false"
     }
   }
}
```