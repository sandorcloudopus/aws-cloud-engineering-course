# AWS S3 - (pseudo) mount S3 to EC2
The purpose of this excercise is to demonstrate how to mount an S3 Bucket to an EC2 Instance. Mountpoint for Amazon S3 is a simple, high-throughput file client for mounting an Amazon S3 bucket as a local file system. With Mountpoint for Amazon S3, your applications can access objects stored in Amazon S3 through file operations like open and read.

## Requirements
- Create an S3 Bucket
- Create an EC2 Instance - with the appropriate IAM Role - for Instance Profilem, and with the correct permissions
- Install the Open Source Tool called `mountpoint-s3`
- Mount the S3 Bucket - and try the basic operations

## Desired Architecture
![MountpointS3](./s3-mount-point-01.png)

## Tips and Tricks
#### Installing S3 Mount Point to Amazon Linux 2
```sh
# Download the Mountpoint for Amazon S3 package
wget https://s3.amazonaws.com/mountpoint-s3-release/latest/x86_64/mount-s3.rpm

# Install
sudo yum install ./mount-s3.rpm

# Verify the Version
mount-s3 --version
```

#### Mount The Bucket to Local FileSystem
```sh
mount-s3 <bucket> /path/to/mount
```

#### IAM Permission - for EC2 Instance Profile using S3 MountPoint
```json
{
   "Version": "2012-10-17",
   "Statement": [
        {
            "Sid": "MountpointFullBucketAccess",
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::<bucket>"
            ]
        },
        {
            "Sid": "MountpointFullObjectAccess",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:AbortMultipartUpload",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::<bucket>/*"
            ]
        }
   ]
}
```

#### Install Tree to see the Bucket Content in a more visually pleasing way
```sh
sudo yum install tree -y
```

## Resources
1. [s3 mount point use case](https://aws.amazon.com/blogs/storage/how-continental-uses-mountpoint-for-amazon-s3-in-autonomous-driving-development-accelerating-simulation-performance-by-20/)
1. [S3 Mountpoint](https://github.com/awslabs/mountpoint-s3/)
1. [Mountpoint Configuration](https://github.com/awslabs/mountpoint-s3/blob/main/doc/CONFIGURATION.md)
1. [Mountpoint Installation](https://github.com/awslabs/mountpoint-s3/blob/main/doc/INSTALL.md)
