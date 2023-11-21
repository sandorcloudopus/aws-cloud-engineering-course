# AWS ECR - Pull Through Cache
- The purpose of this lecture is to demonstrate how to set up AWS ECR Pull through mechanism. 
For the upstream registries that require authentication, you must store your credentials in an AWS Secrets Manager secret. 
- With pull through cache rules, you can sync the contents of an upstream registry with your Amazon ECR private registry. Amazon ECR currently supports creating pull through cache rules for the following upstream registries.

## Requirements

1. Set up an external Image Registry + Repository
    1. Populate with some image
1. Set up "Pull Through Cache Configuration"
    1. Create Access Token
    1. Set up Secret at Secrets Manager
    1. Verify Access
1. Pull the Image through ECR
1. Verify and Examine the behavior
    1. For Example create an EC2 instance - preinstall software and pull the image
1. Clean up the Resources

## Desired Architecture
![AWS ECR - Pull Through Cache](./ecr-pull-through-cache-01.png)

## Tips and Trics
#### Ubuntu Install Docker + AWS CLI Userdata Script
```sh
#!/bin/bash
# Install docker
apt-get update
apt-get install -y cloud-utils apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update
apt-get install -y docker-ce
usermod -aG docker ubuntu
# Install AWS CLI
apt install awscli -y
```

## Resources
1. [AWS ECR Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)
1. [AWS ECR Pull through cache rules](https://docs.aws.amazon.com/AmazonECR/latest/userguide/pull-through-cache.html)