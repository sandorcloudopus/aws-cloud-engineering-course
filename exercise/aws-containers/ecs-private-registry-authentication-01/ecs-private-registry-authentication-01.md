# AWS ECS - Set up Private Registry Authentication for Tasks
- The purpose of this exercise is to experiment using Images from Private Registries with ECS Tasks.
- Private registry authentication for tasks using AWS Secrets Manager enables you to store your credentials securely and then reference them in your task definition. This provides a way to reference container images that exist in private registries outside of AWS that require authentication in your task definitions. 

## Requirements
1. Create an ECS Fargate Cluster
1. Create a Secret to store the Private Registry auth information
1. Create a Task Execution IAM Role
1. Create a Task Definition
      1. Running tasks from Private Registry
1. Create a Fargate Service
1. Clean Up! Don't Forget to Delete the Resources

## Architecture
![Private Registry Authentication for Tasks](./ecs-private-registry-authentication-01.png)

## Tips and Tricks

#### Secret Fields
```json
{
  "username" : "privateRegistryUsername",
  "password" : "privateRegistryPassword"
}
```
#### Private Registry Defined in the Task Definition
```json
"containerDefinitions": [
    {
        "image": "private-repo/private-image",
        "repositoryCredentials": {
            "credentialsParameter": "arn:aws:secretsmanager:region:aws_account_id:secret:secret_name-long-version"
        }
    }
]
```

#### Task Execution IAM Role Policy Reading the Secret of the Private Registry
_kms:Decrypt—Required only if your key uses a custom KMS key and not the default key. The Amazon Resource Name (ARN) for your custom key must be added as a resource._
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "kms:Decrypt",
        "secretsmanager:GetSecretValue"
      ],
      "Resource": [
        "arn:aws:secretsmanager:<region>:<aws_account_id>:secret:secret_name-long-version",
        "arn:aws:kms:<region>:<aws_account_id>:key/key_id"     
      ]
    }
  ]
}
```

## Resources
1. [Private registry authentication for tasks](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/private-auth.html)
