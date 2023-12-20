# AWS VPC - Transit Gateway - Establish centralized outbound routing to the Internet
- The purpose of this exercise is to demonstrate how to implement the `Centralized Outbound` pattern for VPC Transit Gateway. With this capability we can enhance the networking topology.

- Your transit gateway routes IPv4 and IPv6 packets between attachments using transit gateway route tables. You can configure these route tables to propagate routes from the route tables for the attached VPCs, VPN connections, and Direct Connect gateways. You can also add static routes to the transit gateway route tables. When a packet comes from one attachment, it is routed to another attachment using the route that matches the destination IP address.

## Exercise Requirements
1. Create an Outbound VPC
1. Create Multiple (3) Spoke VPC
1. Create a Transit Gateway
    1. Configure the Transit Gateway to forward outbound traffic through the Outbound VPC
    1. Use TGW  Attachments
    1. Configure the VPC Route Tables Accordingly
    1. Make sure that you don't have overlapping IP Address Range
    1. Also configure Blackhole routes in the Spoke VPC
1. Clean Up! Don't Forget to Delete the Resources!

## Resources
- [AWS Transit Gateway Centralized Outbound Pattern](https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-nat-igw.html#transit-gateway-nat-igw-overview)