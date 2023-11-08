# AWS EFS - Mount EFS from a Different VPC (same Region)
The purpose of this excercise is to demonstrate how to mount EFS File Systen to an EC2 Instance, from a different VPC. 

## Requirements
- Create 2 different VPC
    - don't overlape the CIDR
    - have matching AZs (the EFS Mount Point and EC2 needs to be in the same AZ)
- Create the EFS in VPC 1
- Create the EC2 in VPC 2
- Mount the EFS to EC2

## Desired Architecture
![Desired Arch for Mounting EFS to EC2](./efs-mount-from-different-vpc.png)

## Tips and Tricks
#### Installing EFS-Helper on Amazon Linux 2
```sh
sudo yum install -y amazon-efs-utils
```

#### Adding a Host Entry for the Mount Target
```sh
echo "<mount target ip> <efs id>.efs.<region>.amazonaws.com" | sudo tee -a /etc/hosts
```

#### Mounting with EFS-Helper
```sh
sudo mount -t efs -o tls <file system id> /mnt/data/
```

## Resources
1. [VPC Peering Connection](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)
1. [EFS Utils/GitHub](https://github.com/aws/efs-utils)
1. [Walkthrough: Mount a File System from Different VPC](https://docs.aws.amazon.com/efs/latest/ug/efs-different-vpc.html)