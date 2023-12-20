# AWS VPC Subnet Network Access Control List - For Web Application Serving EC2 Instance
- Restrincting Network traffic at the Subnet level is also possible using NACLs. A network access control list (ACL) allows or denies specific inbound or outbound traffic at the subnet level. You can use the default network ACL for your VPC, or you can create a custom network ACL for your VPC with rules that are similar to the rules for your security groups in order to add an additional layer of security to your VPC.
- There is no additional charge for using network ACLs.
- __The Purpose of the exercise__ is to learn the logic behind NACL. We are going to demonstrate how to properly configure a NACL for a Web Application
- NACLs are stateless, which means that information about previously sent or received traffic is not saved. If, for example, you create a NACL rule to allow specific inbound traffic to a subnet, responses to that traffic are not automatically allowed. This is in contrast to how security groups work. Security groups are stateful, which means that information about previously sent or received traffic is saved. If, for example, a security group allows inbound traffic to an EC2 instance, responses are automatically allowed regardless of outbound security group rules. 

## Exercise
1. Create an EC2 Instance Running a Web Application
    1. You can enable TLS/SSL Termination - HTTPS Redirect
1. Configure Security Group
1. Create the proper NACL for the Public Subnet - where the application resides
    1. Allow traffic on port 80/443 from the internet - and allow outbound traffic to the internet to the ephemeral ports
    1. Alos allow SSH Traffic
    1. (Pay attention to the Ephemeral Ports)
1. Clean Up! Don't Forget to Delete the Resources!

## Quick Overview
![AWS VPC Subnet Network Access Control List - For Web Application Serving EC2 Instance](./nacl-for-webapplication-01.png)

## Tips and Tricks
#### Inbound Rules Example for Web App with SSH

| Rule # | Type | Protocol | Port range | Source | Allow/Deny | Comments |
|--------|------|----------|------------|--------|------------|----------|
| 100 | HTTP | TCP | 80 | 0.0.0.0/0 | ALLOW | Allows inbound HTTP traffic from any IPv4 address. |
| 110 | HTTPS | TCP | 443 | 0.0.0.0/0 | ALLOW | Allows inbound HTTPS traffic from any IPv4 address. |
| 120 | SSH | TCP | 22 | 192.0.2.0/24 | ALLOW | Allows inbound SSH traffic from your home network's public IPv4 address range (over the internet gateway). |
| 130 | Custom TCP | TCP | 32768-65535 | 0.0.0.0/0 | ALLOW | Allows inbound return IPv4 traffic from the internet (that is, for requests that originate in the subnet). This range is an example only. |
| * | All traffic | All | All | 0.0.0.0/0 | DENY | Denies all inbound IPv4 traffic not already handled by a preceding rule (not modifiable). |

#### Outbound Rules Example for Web App with SSH
 Rule # | Type | Protocol | Port range | Destination | Allow/Deny | Comments |
|--------|------|----------|------------|-------------|------------|----------|
| 100 | HTTP | TCP | 80 | 0.0.0.0/0 | ALLOW | Allows outbound IPv4 HTTP traffic from the subnet to the internet. |
| 110 | HTTPS | TCP | 443 | 0.0.0.0/0 | ALLOW | Allows outbound IPv4 HTTPS traffic from the subnet to the internet. |
| 120 | SSH | TCP | 1024-65535 | 192.0.2.0/24 | ALLOW | Allows outbound SSH traffic from your home network's public IPv4 address range (over the internet gateway). |
| 140 | Custom TCP | TCP | 32768-65535 | 0.0.0.0/0 | ALLOW | Allows outbound IPv4 responses to clients on the internet (for example, serving webpages to people visiting the web servers in the subnet). This range is an example only. |
| * | All traffic | All | All | 0.0.0.0/0 | DENY | Denies all outbound IPv4 traffic not already handled by a preceding rule (not modifiable). |


#### Example Nginx Config for quick webserver (testing purposes)
```
events {
    worker_connections  1024;
}

http {
    server {
        listen 80;
        server_name <server-name>;

        # Redirect all HTTP requests to HTTPS
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        server_name <server-name>;

        # SSL certificate and key files
        ssl_certificate /etc/nginx/ssl/bundled.crt; # Path to your SSL certificate
        ssl_certificate_key /etc/nginx/ssl/private.key; # Path to your SSL private key

        location / {
            return 200 'OK';
            add_header Content-Type text/plain;
        }
    }
}
```
## Resources
1. [Control traffic to subnets using network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)