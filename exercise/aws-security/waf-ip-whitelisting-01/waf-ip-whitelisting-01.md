# AWS WAF - Set up IP Whitelisting with WAF
- AWS WAF is a web application firewall that lets you monitor the HTTP and HTTPS requests that are forwarded to your protected web application resources.
- The purpose of this exercise to know the foundational basics, and create a Whitelist Rule for custom IP Address to block all requests originationg from a different IP Address.
- In order to complete the exercise we need to work with IP Sets and Web ACL Rules.

## Exercise
1. Setup Basics (example below)
    1. AWS REST API Gateway - with Mock Method on the Resource
    1. Test the API
1. Create a WAF - to Whitlist your IP Addresså
    1. Create a WAF - IP Set
    1. Create a Custom Rule Group/Rules
    1. Associate the Web ACL with the AWS RST API Gateway
1. TEST the IP Whitelist if working
    1. Also try to query the API Gateway URL from a different IP Addres (us VPN or different location)
1. Clean Up! Don't Forget to Delete the Resources!

## Quick Overview
![AWS WAF - IP Whitelisting](./waf-ip-whitelisting-01.png)

## Tips and Tricks
#### To specify the IPv4 address as an IP set IP Address
- Example, For `192.0.2.44`, type `192.0.2.44/32`. Don't Forgget the CIDR Notation

## Resources
1. [How AWS WAF Works](https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works.html)
1. [AWS WAF Rule Groups](https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-groups.html)
1. [Creating an IP Set](https://docs.aws.amazon.com/waf/latest/developerguide/waf-ip-set-creating.html)