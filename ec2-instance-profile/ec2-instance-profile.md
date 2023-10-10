# AWS EC2 - Create and use an Instance Profile
The purpose of this excercise is to demonstrate the capabilities and the nature of Instance Profile and Temporary credentials. Applications and different server agents can use these temporary short lived credentials.

## Requirements
- Create an EC2 Instance in the Default Subnet - Assign a Public IP
    - Use the default AL2023 Image
- Install and Configure Terraform
    - Use the AWS Provider
    - Create an S3 Bucket for Storing State
    - Create a random resource also - just for testing the functionality
- Create an Instance Profile
    - Allow access to the state S3 Bucket
    - Allow access to Systems Manager having the SSM Agent send data to the Systems Manager

## Desired Architecture


## Tips and Tricks
