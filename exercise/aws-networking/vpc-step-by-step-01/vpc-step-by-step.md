# AWS VPC - Create a Fully Featured VPC - (step by step)

In this exercise I would like to Demonstrate how to create a Fully Featured VPC. In the Video Attached to this lecture I elaborate on the following topics as well: "+2 IP for nameserver", "Networking Interface and Security Group Connection", "Connecting to the Instance with Session Manager", "NAT Gateway", "Network Tracing".

## Exercise Requirements
1. Create VPC with
    1. Internet Gateway
    1. NAT Gateway
    1. Public and Private Subnets
    1. Configure Routing Appropriatly
    1. Create an S3 Gateway Endpoint
1. Clean Up! Don't Forget to Delete the Resources!

## Tips and Trics
#### Commands were used during the Video
1. `whoami`
2. `curl google.com`, `curl -L google.com`
3. `ip addr`
4. `cat /etc/resolve.conf`
5. `sudo tcptraceroute s3.eu-central-1.amazonaws.com 443`

## Resources
1. [AWS VPC - Internet Gateway docs](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html)
1. [AWS VPC - NAT Gateways](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)
1. [AWS VPC - High Level Overview](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)