# AWS Backup - EFS Cross Region Replication
The purpose of this excercise is to demonstrate how to set up Cross Region Replication for an EFS Filesystem.

Use EFS replication to automatically maintain copies of your EFS file systems for business continuity or to help you to meet compliance requirements as part of your disaster recovery strategy. You can set this up in minutes for new or existing EFS file systems, with replication either within a single AWS region or between two AWS regions.

Once configured, replication begins immediately. All replication traffic stays on the AWS global backbone, and most changes are replicated within a minute, with an overall Recovery Point Objective (RPO) of 15 minutes for most file systems. Replication does not consume any burst credits and it does not count against the provisioned throughput of the file system.

## Requirements
1. Create an EFS Filesystem
1. Enable Cross Region Replication
1. Examine the behavior - make sure that the files has been copied over to the replicated region
1. Disable replication and make the second Filesytem a read+write fileystem

## Desired Architecture

## Tips and Tricks
#### Check Files systyem and storage space
```sh
# The df command is used to display the disk space used in the file system. The df stands for "disk filesystem." It defines the number of blocks used, the number of blocks available, and the directory where the file system is mounted.
df -h
```

#### Installing EFS-Helper on Amazon Linux 2
```sh
sudo yum install -y amazon-efs-utils
```

#### Mounting with EFS-Helper
```sh
sudo mount -t efs -o tls <file system id> /mnt/data/
```

#### Userdata Script (Mount EFS)
```sh
#!/bin/bash
yum update -y
yum install -y amazon-efs-utils
mkdir /data
mount -t efs -o tls /data
chown ec2-user:ec2-user /data
```

#### Download AWS IP Ranges
```sh
curl -o ip.json https://ip-ranges.amazonaws.com/ip-ranges.json
```

## Resources
1. [mount manuals](https://linux.die.net/man/8/mount)
1. [Best Video on Youtube regarding EFS Security Ever](https://www.youtube.com/watch?v=tIK6BBo_9n0)
1. [EFS Install EFS Helper for IAM Authentication](https://docs.aws.amazon.com/efs/latest/ug/installing-amazon-efs-utils.html)
1. [EFS Cross Region Replication](https://aws.amazon.com/blogs/aws/new-replication-for-amazon-elastic-file-system-efs/)
