# AWS Backup - Backup EC2 Cross Region with AWS Backup
The purpose of this excercise is to demonstrate how to backup EC2 Instances Cross Region using AWS Backup Service.

## Requirements
1. Create an EC2 Instance (defaults are file)
1. Create a Backup Vault in multiple Regions (Region A + Region B)
1. Backup the EC2 Instance in Region A
1. Copy the Recovery point of the EC2 Instance Backup to Region B Vault
1. Repeat this process using a Backup Plan
1. Clean Up! Don't Forget to Delete the Resources

## Desired Architecture
![AWS Backup - EC2 Cross Region Backup Copy](./backup-ec2-cross-region-copy.png)

## Resources
1. [Backup Features](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html#features-by-resource)
1. [AWS CLI List Backup Plans](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/backup/list-backup-plans.html)
