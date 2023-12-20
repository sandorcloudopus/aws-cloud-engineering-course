# AWS CloudWatch - Use Syntetics Monitoring for Website Monitoring
- You can use Amazon CloudWatch Synthetics to create canaries, configurable scripts that run on a schedule, to monitor your endpoints and APIs. Canaries follow the same routes and perform the same actions as a customer, which makes it possible for you to continually verify your customer experience even when you don't have any customer traffic on your applications. By using canaries, you can discover issues before your customers do.
- Canaries are scripts written in Node.js or Python. They create Lambda functions in your account that use Node.js or Python as a framework. Canaries work over both HTTP and HTTPS protocols.
- Canaries offer programmatic access to a headless Google Chrome Browser via Puppeteer or Selenium Webdriver.
- The purpose of this exercise is to gain knowledge how to use AWS CloudWatch Syntetics Monitoring for Application/Website Monitoring 

## Exercise Requirements
1. Create a Canary (use a blueprint)
    1. Set to a custom frequency
    1. Set up custom Website  URLs like `https://google.com` or/and `https://bing.com`
1. Wait and examine the behavior
1. Check the Automatically created resources
1. Clean Up! Don't Forget to Delete the Resources!

## Quick Overview
![AWS CloudWatch Syntetics Monitoring](./cloudwatch-syntetics-monitoring-01.png)

## Good to Know
#### HAR Files
- The HAR (HTTP Archive) file format is a JSON structured file containing all network traffic information about a browser’s interactions with the server providing content for a webpage. 

## Resources
1. [Using Syntetics Monitoring](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html)