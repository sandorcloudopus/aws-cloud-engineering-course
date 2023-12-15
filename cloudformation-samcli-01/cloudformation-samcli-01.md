# AWS CloudFormation - Use SAM CLI
- The AWS Serverless Application Model (AWS SAM) is a toolkit that improves the developer experience of building and running serverless applications on AWS. AWS SAM consists of two primary parts:
    - AWS SAM template specification 
    - AWS SAM command line interface (AWS SAM CLI)
- SAM CLI is also provides a better way to deploy regular CloudFormation or SAM Templates to AWS

## Exercise Requirements
- Create a SAM Template
- Run SAM `validate` Template
- Run SAM `lint` Template
- Run SAM `list` Resources
- Run SAM `deploy` STACK
- Run SAM `delete` STACK

## Tips and Tricks
#### Validating SAM Template with Linting
1. `sam validate -t sam-template.yaml --lint`

#### Listing the template resources
1. `sam list resources -t sam-template.yaml`

#### Deploying the SAM Template
1. `sam deploy --resolve-s3 -t sam-template.yaml --stack-name MYVPCSTACK --parameter-overrides 'VpcName=best'`
1. `sam list resources -t sam-template.yaml --stack-name MYVPCSTACK`

#### Deleting a Stack
1. `sam delete --stack-name MYVPCSTACK`

## Resources
1. [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
1. [AWS SAM CLI Reference](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html)
1. [Installing SAM CLI with homebrew](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/manage-sam-cli-versions.html#manage-sam-cli-versions-homebrew)