# AWS CloudFormation Guard - Use cfn-guard CLI
- AWS CloudFormation Guard is an open-source, general-purpose, policy-as-code evaluation tool. The Guard command line interface (CLI) provides a simple-to-use, yet powerful and expressive, declarative domain-specific language (DSL) that you can use to express policy as code. 
- The purpose of this exercise is to get to know how to use cfn-guard. I would like you to go through how to run the cfn-guard, and how you can generate custom rules.

## Exercise Requirements
1. Install cfn-guard
1. Run cfn-guard on the provided examples (files attached)
1. Examine the Command Line Tool Utilities
1. Generate your own cfn-guard templates
1. Clean Up! Don't Forget to Delete the Resources!

## Tips and Tricks
#### Validate CloudFormation using Guard
```sh
# validating s3-1.yaml and s3-2.yaml against the cloudformation-guard.rules Rule File and setting the output to ALL findings
cfn-guard validate \
  --data s3-1.yaml \
  --data s3-2.yaml \
  --rules cloudformation-guard.rules \
  -S all
```

#### Generating a new guard based on the file properties
`cfn-guard rulegen -t s3-generate.yaml -o new-guard.guard`

## Resources
1. [cfn-guard installation](https://docs.aws.amazon.com/cfn-guard/latest/ug/setting-up-linux.html)
1. [cfn-guard documentation](https://docs.aws.amazon.com/cfn-guard/latest/ug/what-is-guard.html)