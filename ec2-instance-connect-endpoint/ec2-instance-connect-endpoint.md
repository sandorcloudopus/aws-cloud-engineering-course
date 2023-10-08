# AWS EC2 - Create an EC2 Instance Connect Endpoint

## Requirements
1. Create a VPC with 2 private subnet (No Internet Connectivity)
2. Create separate 2 Instance in the 2 subnet
3. Create an Instance Connect Endpoint
4. Setup IAM Users with Proper Permissions to issue the `ec2-instance-connect:OpenTunnel` "Action"
5. Setup your Client (Terminal) with proper tools (latest AWS CLI)
6. Test Connectivity from AWS Console and from your Client Terminal
7. Delete the Resources

## Desired Architecture (components)
![Architecture](./ec2-instance-connect-endpoint.png)

## Tips and Trics

### Connect to the Instance Using Short Lived Keys (preferred method)
```sh
aws ec2-instance-connect ssh --instance-id [INSTANCE]
```
### Connect to the Instance Using Traditional SSH Keys
```sh
ssh ec2-user@[INSTANCE] \
    -i [SSH-KEY] \
    -o ProxyCommand='aws ec2-instance-connect open-tunnel \
    --instance-id %h'
```
### User Required Permissions
```json
{
    "Version": "2012-10-17",
    "Statement": [{
            "Sid": "EC2InstanceConnect",
            "Action": "ec2-instance-connect:OpenTunnel",
            "Effect": "Allow",
            "Resource": "arn:aws:ec2:region:account-id:instance-connect-endpoint/eice-123456789abcdef",
            "Condition": {
                "NumericEquals": {
                    "ec2-instance-connect:remotePort": "22"
                },
                "IpAddress": {
                    "ec2-instance-connect:privateIpAddress": "10.0.1.0/31"
                }
            }
        },
        {
            "Sid": "SSHPublicKey",
            "Effect": "Allow",
            "Action": "ec2-instance-connect:SendSSHPublicKey",
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "ec2:osuser": "ami-username"
                }
            }
        },
        {
            "Sid": "Describe",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:DescribeInstanceConnectEndpoints"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

## Resources
- [Instance Connect Introduction](https://aws.amazon.com/blogs/compute/secure-connectivity-from-public-to-private-introducing-ec2-instance-connect-endpoint-june-13-2023/)
- [Instance Connect Endpoint Security Group Configuration](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/eice-security-groups.html#eice-security-groups-example)
- [Instance Connect User Permissions for connection](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/permissions-for-ec2-instance-connect-endpoint.html)
- [Instance Connect Documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-with-ec2-instance-connect-endpoint.html)
- [Updating and Installing AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions)
