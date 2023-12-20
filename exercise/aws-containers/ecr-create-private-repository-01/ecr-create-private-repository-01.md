# AWS ECR - Create a Private Repository
- The purpose of this excercise is to demonstrate how to create a Private Repository in AWS for Docker Images.

- By default, your account has read and write access to the repositories in your default registry (aws_account_id.dkr.ecr.region.amazonaws.com). However, users require permissions to make calls to the Amazon ECR APIs and to push or pull images to and from your repositories. Amazon ECR provides several managed policies to control user access at varying levels.

## Requirements
1. Create an AWS ECR Private Repository
1. Login to the Registry
1. Push an image to the Repository
1. Clean Up! Don't Forget to Delete the Resources!

## Tips and Trics
#### Registry Login
```sh
# Registry Login
aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
```

## Resources
1. [AWS ECR Repository](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html)
1. [Creating an AWS ECR Repository](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-create.html)
1. [Pushing a Docker Image](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-push.html)