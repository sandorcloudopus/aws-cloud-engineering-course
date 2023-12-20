# AWS CloudFormation - Take Advantage of Deletion Policy attribute
- Using AWS CloudFormation with the DeletionPolicy attribute you can preserve, and in some cases, backup a resource when its stack is deleted.
- The purpose of this experiment with the AWS CloudFormation with the DeletionPolicy attribute. Create a resources with Retain/Snapshot/RetainExceptOnCreate policy.

## Exercise Requirements
1. Create a CloudFormation Template and Resources with
    1. Deletion Policy
        1. Retain
        1. Snapshot
        1. RetainExceptOnCreate
1. Clean Up! Don't Forget to Delete the Resources!

## Good to Know
#### RetainExceptOnCreate DeletionPolicy Attribute
- RetainExceptOnCreate behaves like Retain for stack operations, except for the stack operation that initially created the resource. If the stack operation that created the resource is rolled back, CloudFormation deletes the resource. 

## Resources
1. [AWS CloudFormation - Deletion Policy Documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html)
