# AWS CloudFormation - Create Nested Stacks
- Nested stacks are stacks created as part of other stacks. As your infrastructure grows, common patterns can emerge in which you declare the same components in multiple templates. You can separate out these common components and create dedicated templates for them. Then use the resource in your template to reference other templates, creating nested stacks.
- In the following exercise, I would like to demonstrate how to create a Networking Stack with well separated nested stacks and parent stacks

## Exercise
- Create a SAM Nested Stack
- Run SAM `validate` Templates
- Run SAM `lint` on the Templates
- Run SAM `list` Resources
- __RUN SAM PACKAGE__
- Run SAM `deploy` STACK
- Run SAM `delete` STACK

## Tips and Tricks
#### Validating SAM Template with Linting
1. `sam validate -t sam-template.yaml --lint`

#### Listing the template resources
1. `sam list resources -t sam-template.yaml `

#### SAM Package the Nested Template
1. `sam package -t networking-root.yaml --resolve-s3 --output-template-file bundled-networking-root.yaml`

#### Deploying the SAM Template
1. `sam deploy --resolve-s3 -t sam-template.yaml --stack-name MYVPCSTACK --parameter-overrides 'VpcName=best'`
1. `sam list resources -t sam-template.yaml --stack-name MYVPCSTACK`

#### Deploying bundled the SAM Template
1. `sam deploy --template-file bundled-networking-root.yaml --stack-name MYVPCSTACK --parameter-overrides 'VpcName=best' --capabilities CAPABILITY_AUTO_EXPAND`

#### Delete the Root Stack
1. `sam delete --stack-name MYVPCSTACK`

## Resources
1. [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
1. [AWS SAM CLI Reference](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html)