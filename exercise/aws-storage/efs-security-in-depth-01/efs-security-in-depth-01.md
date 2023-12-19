# AWS EFS - Secure AWS EFS Filesystems
- In the following Excercise I would like you to discover how to apply best-in-class EFS security features. EFS security features includes: Encryption in Transit, Encryption in Rest, using Security Groups and Access Points, and using IAM for Identity Based and Resource Based policies.

- Also an access point applies an operating system user, group, and file system path to any file system request made using the access point. The access point's operating system user and group override any identity information provided by the NFS client. The file system path is exposed to the client as the access point's root directory. This approach ensures that each application always uses the correct operating system identity and the correct directory when accessing shared file-based datasets. Applications using the access point can only access data in its own directory and below.


## Requirements
- Encrypt in Transit EFS in Transit and in Rest,
- Use Access Points to Restrict Access
### In Details:
- Create Policies which Enforcing Encryption at Rest, attach to the EFS Admins
- Create Secure EFS Based Setup
- Create 2 distinct EC2 instance 
- Create a Secure EFS Filesystem
    - Encryption at rest
- Extend the EFS Fylesystem Policy to
    - Enforce encryption in Transit with IAM
    - Enforce access to the Filesystem through Access Points
- Create 2 distinct Access Points
    - Create the appropriate POSIX UIDs and GIDs
- Mount the Access Points to the 2 EC2 Instances
- Test if Users can Access their EFS mount and not the other Users file

## Good to Knows
1. The default EFS file system policy does not use IAM to authenticate, and grants full access to any anonymous client that can connect to the file system using a mount target. 
1. You must use the EFS mount helper to mount your Amazon EFS file systems in order to use IAM authorization to control client access. For more information, see Mounting with IAM authorization.
1. NFS clients can identify themselves using an IAM role when connecting to an EFS file system. When a client connects to a file system, Amazon EFS evaluates the file system’s IAM resource policy, which is called a file system policy, along with any identity-based IAM policies to determine the appropriate file system access permissions to grant.

## Desired Architecture
[AWS EFS - Secure AWS EFS Filesystems](./efs-security-in-depth-01.png)

## Tips and Trics
#### Installing EFS-Helper on Amazon Linux 2
```sh
sudo yum install -y amazon-efs-utils
```

#### Explicitly Deny Creating FileSystem without Encryption Enabled at Rest
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DenyLaunchEFSifEncryptionAtRestIsNotEnabled",
            "Effect": "Deny",
            "Action": [
                "elasticfilesystem:CreateFileSystem"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "elasticfilesystem:Encrypted": "false"
                }
            }
        }
    ]
}
```

#### Resource Based Policy - Not Allow Root Access
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SemiTrust",
            "Effect": "Allow",
            "Action": [
                "elasticfilesystem:ClientMount",
                "elasticfilesystem:ClientWrite"
            ],
            "Principal": {
                "AWS": "<Principal>"
            }
        }
    ]
}
```

#### Reinforce Encryption (Identity based)
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SecureTransport",
            "Effect": "Allow",
            "Action": [
                "elasticfilesystem:ClientMount",
                "elasticfilesystem:ClientWrite"
            ],
            "Condition" {
                "Bool" {
                    "aws:SecureTransport": "true"
                }
            }
        }
    ]
}
```
#### Required Using AWS Access Point
```json
{
    "Statement": [
        {
            "Sid": "access-point-statement",
            "Effect": "Allow",
            "Principal": {"AWS": "arn:aws:iam::555555555555:role/EfsAccessPointFullAccess"},
            "Action": "elasticfilesystem:Client*",
            "Resource": "arn:aws:elasticfilesystem:us-east-2:111122223333:file-system/fs-12345678",
            "Condition": { 
                "StringEquals": {
                    "elasticfilesystem:AccessPointArn":"arn:aws:elasticfilesystem:us-east-2:555555555555:access-point/fsap-12345678" } 
            }            
        }
    ]
}
```

## Possible Filesystem Policy - Enforce Encrpytion and EFS Access Points
```json
{
    "Version": "2012-10-17",
    "Id": "efs-policy-wizard-2d13dae6-650d-4233-95f1-efb3214ff8bb",
    "Statement": [
        {
            "Sid": "access-point-statement-1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<Account-ID>:role/Workload-1"
            },
            "Action": [
                "elasticfilesystem:ClientMount",
                "elasticfilesystem:ClientWrite"
            ],
            "Resource": "<EFS ARN>",
            "Condition": {
                "StringEquals": {
                    "elasticfilesystem:AccessPointArn": "<ACCESS POINT 1 ARN>"
                }
            }
        },
        {
            "Sid": "access-point-statement-2",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<Account-ID>:role/Workload-2"
            },
            "Action": [
                "elasticfilesystem:ClientMount",
                "elasticfilesystem:ClientWrite"
            ],
            "Resource": "<EFS ARN>",
            "Condition": {
                "StringEquals": {
                    "elasticfilesystem:AccessPointArn": "<ACCESS POINT 2 ARN>"
                }
            }
        },
        {
            "Sid": "efs-statement-8fbd87dc-f65c-4f12-9d47-4215aca6c9cd",
            "Effect": "Deny",
            "Principal": {
                "AWS": "*"
            },
            "Action": "*",
            "Resource": "<EFS ARN>",
            "Condition": {
                "Bool": {
                    "aws:SecureTransport": "false"
                }
            }
        }
    ]
}
```

## Resources
1. [Best Video on Youtube regarding EFS Security Ever](https://www.youtube.com/watch?v=tIK6BBo_9n0)
1. [EFS File System Policy](https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html)
1. [EFS Install EFS Helper for IAM Authentication](https://docs.aws.amazon.com/efs/latest/ug/installing-amazon-efs-utils.html)
