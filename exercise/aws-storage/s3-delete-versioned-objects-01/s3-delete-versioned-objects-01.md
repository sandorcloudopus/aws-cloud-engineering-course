# AWS S3 - Delete Objects from versioning enabled Bucket
- The purpose of this exercise is to demonstrate how to Delete Objects from an S3 Bucket where the Versioning is enabled.

## Requirements
- Create an S3 Bucket - Enable Versioning
- Upload and Update an Object
- Delete the Object traditionally
- Observe what happened - look for all the version of the object
- Delete all the versions

## S3 Versioning in Picture
![S3 Versioning in Picture](./s3-delete-versioned-objects-01.png)

## Tips and Tricks
#### You can use the ./source/v1 - source/v2 folders for content

## Resources
1. [S3 Delete Objects from versioned enabled Bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/DeletingObjectVersions.html)
1. [S3 Expiring Objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html)