# AWS IAM - Preventing Privilige Escalation with Permission Boundaries
- An AWS permissions boundary is a security mechanism that limits the permissions an IAM principal (users and roles) can perform. By setting a permissions boundary, organizations can establish a consistent and well-defined authorization framework that prevents the accidental or intentional escalation of privileges. Permissions setting helps mitigate the risk of unauthorized access to sensitive resources and limits the potential impact of security breaches or human errors.
- In the Following Excercise we are going to create a Permission Boundary policy for Roles and Users. Simulating Real world scenario.

## Exercise Requirements
1. Create a Boundary Permission Policy
1. Create an IAM User with Console Access - Attach the Boundary Permission Policy to it and add some permissions
1. Log In with the IAM User and try to do privilige escalation
  1. If it the mechanism prevents the user to do further actions -> You did great!
1. Prevent the User/Role to detach + modify the Boundary Policy

## Quick Overview
![AWS IAM - Preventing Privilige Escalation with Permission Boundaries](./iam-permission-boundaries-01.png)

## Tips and Tricks
#### Base Permission Policy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ALLOWActions",
            "Effect": "Allow",
            "Action": [
                "iam:*",
                "s3:*",
                "lambda:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "EnforceActionsHaveBoundary",
            "Effect": "Deny",
            "Action": [
                "iam:AttachRolePolicy",
                "iam:CreateRole",
                "iam:CreateUser",
                "iam:UpdateUser",
                "iam:DetachRolePolicy",
                "iam:PutRolePolicy",
                "iam:DeleteRolePolicy",
                "iam:PutRolePermissionsBoundary"
            ],
            "Resource": "*",
            "Condition": {
                "StringNotLike": {
                    "iam:PermissionsBoundary": "arn:aws:iam::*:policy/permissionboundarypolicy"
                }
            }
        },
        {
            "Sid": "DenyChangesToBoundaryPolicy",
            "Effect": "Deny",
            "Action": [
                "iam:DeletePolicy",
                "iam:CreatePolicyVersion",
                "iam:CreatePolicy",
                "iam:DeletePolicyVersion",
                "iam:SetDefaultPolicyVersion"
            ],
            "Resource": "arn:aws:iam::*:policy/permissionboundarypolicy"
        },
        {
            "Sid": "NoBoundaryUserDelete",
            "Effect": "Deny",
            "Action": "iam:DeleteUserPermissionsBoundary",
            "Resource": "*"
        }
    ]
}
```

## Resources
1. https://github.com/aws-samples/example-permissions-boundary
1. https://snyk.io/blog/aws-permissions-boundaries-and-snyk/
1. https://sonraisecurity.com/blog/aws-permission-boundary-what-is-it-and-how-to-use-it/
1. https://carriagereturn.nl/aws/iam/policy/boundary/2021/10/07/iambound.html