# AWS EC2 EBS - Increase the storage size of an EBS Volume (root volume)
- The purpose of this excercise to get to know how to increase the Root Volume Size of an EC2 Instance. For completition of this lecture, the engineer requiered to use AWS native APIs and Linux Tools like (growpart/xfs_growfs/resize2fs)

## Requirements
1. Create an EC2 Instance
1. Log in to the Instance (use one of the many method available)
1. Examine the characteristics of the Block Devices and the Filesystems
1. Extend the Root Volume (make sure that the File System is also taken care of and running `df -h` command show you the expected result)

## Tips and Tricks
1. Extend Partition xfs/ext4 - `sudo growpart /dev/nvme0n1 1`
1. Extend File System - xfs - `sudo xfs_growfs -d /`
1. Extend File System - ext4 - `sudo resize2fs /dev/nvme0n1p1`

## Resources
1. [Increase EC2 Volume Size](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/step3-increase-size-of-data-volume.html)
1. [Extend a File System (xfs or ext4)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html)