# AWS S3 - Lifecycle Policy - Delete Objects Automatically After 90 Days
The purpose of this excercise is to demonstrate the capabilities of S3 Lifecycle Policies. When an object reaches the end of its lifetime based on its lifecycle configuration, Amazon S3 takes an action based on which state the bucket is in. Non-versioned bucket – Amazon S3 queues the object for removal and removes it asynchronously, permanently removing the object. Versioning-enabled bucket – If the current object version is not a delete marker, Amazon S3 adds a delete marker with a unique version ID. This makes the current version noncurrent, and the delete marker the current version.

## Requirements
1. Create An S3 Bucket
1. Set Up a Lifecycle Policy - the Rule should delete any objects older 90 days
    a. Make sure that if the Bucket Versioning is enabled, those expired (non current objects) are also deleted

## Resources
1. [S3 Objects Lifecycle Management](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)
1. [S3 Expiring Objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html)