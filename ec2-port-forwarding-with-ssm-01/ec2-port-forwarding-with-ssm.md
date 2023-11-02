# AWS EC2 - Port Forwarding Excercise
The purpose of this excercise is to demonstrate the capabilities of EC2 SSM Session Manager Port Forwarding. You can learn how to Port Forward the RDS Database port from a Private VPC.

## Requirements
- Create a VPC with 2 private Subnet (no interent connectivity)
- Create VPC Endpoints
    - SSM
    - SSMMessages
    - EC2Messages
- Create an Ec2 Instance (Have an Instance Profile with a managed policy (SSMManagedInstanceCore)) within the VPC Private Subnets
- Create an RDS Database within the VPC Private Subnets
- Don't forget to configure AWS CLI and a Session Manager Plugin
- Issue the appropriate commands

## Desired Architecture
![Port Forwarding](./ec2-port-forwarding-with-ssm-01.png)

## Tips and Tricks
#### Port Forwarding Command
```sh
aws ssm start-session \                   
    --target  i-0b4d63c26f6c30079 \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters '{"host":["xxxx.xxx.rds.amazonaws.com"],"portNumber":["5432"], "localPortNumber":["5432"]}' --region eu-central-1
```

#### Connecting to the Database using PSQL tool
```sh
psql --host=127.0.0.1 --port=5432 --username=postgres --password --dbname=postgres
```

## Resources
1. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
1. [Install the Session Manager Plugin!!](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html)
1. [Install PSQL](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/)
1. [Port Forwarding with SSM](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-sessions-start.html)
1. [VPC Endpoints for Systems Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html)