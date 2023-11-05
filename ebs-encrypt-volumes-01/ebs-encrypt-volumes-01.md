# AWS EC2 EBS - Encrypt unencrypted Volumes of EC2 Instance
- The purpose of this excercise to show how to encrypt an unencrypted EBS Volume attached to an EC2 Instance. 

## Requirements
- Create the Scenario
    - Create an EC2 Instance with a Root volume and an additonal attached Volume
- Encrypt both Root Volume and the additional attached Volume
- EC2 Instance Downtime is not an issue

## Desired Architecture
![Arch](./ebs-encrypt-volumes-01.png)

## Tips and Tricks
#### Check Files systyem and storage space
```sh
# The df command is used to display the disk space used in the file system. The df stands for "disk filesystem." It defines the number of blocks used, the number of blocks available, and the directory where the file system is mounted.
df -h
```
#### Check Volumes with detailed file system information
```sh
# lsblk is a command-line utility used for listing block devices on a Linux system.
lsblk --fs
```

#### Create File System on an attached Volume
```sh
#
mkfs -t ext4 /dev/xvdf
```

#### Mount a formatted volume to a directory
```sh
# Mount the Filesystem
mount /dev/xvdf /<some-directory>
```