# AWS Backup - Create a crash-consistent backup from AWS EC2 with multiple Volumes attached
- The goal of this exercise to discover the capabilites of AWS Backups regarding EC2 instances.
- By default, AWS Backup creates crash-consistent backups of Amazon EBS volumes that are attached to an Amazon EC2 instance. Crash consistency means that the snapshots for every Amazon EBS volume attached to the same Amazon EC2 instance are taken at the exact same moment. You no longer have to stop your instances or coordinate between multiple Amazon EBS volumes to ensure crash-consistency of your application state.

## Requirements
1. Create an EC2 Instance
    1. Attach 3 volume to the instance (1 root, 2 additional)
    1. Enable volume deletion after instance deletion
1. Create a filesystem from these volumes after install provisioning
1. Mount the 2 additional volume to a directory
1. Write any data of these 2 directories
1. Create a Backup Vault
1. Create a Recovery Point from the EC2 Instance (Examine the behavior)
    1. Go to Volumes, Snapshots, AMIs
1. After the Recovery point is ready - Delete the EC2 Instance (simulate the incident)
1. Recover the EC2 from the Recovery Point
1. Examine all the resources and events involved in the process
1. Clean Up! Don't Forget to Delete the Resources!

## Desired Architecture
![Create a crash-consistent backup from AWS EC2 with multiple Volumes attached](./backup-ec2-multi-volume-crash-consistent-backups-01.png)

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

## Resources
1. [Amazon EBS multi-volume, crash-consistent backups](https://docs.aws.amazon.com/aws-backup/latest/devguide/multi-volume-crash-consistent.html)
1. [lsblk manuals](https://man7.org/linux/man-pages/man8/lsblk.8.html)
1. [mount manuals](https://linux.die.net/man/8/mount)
1. [mkfs manuals](https://linux.die.net/man/8/mkfs)
