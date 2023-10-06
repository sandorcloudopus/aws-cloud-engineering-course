# AWS EC2 - Createa a Classic Bastion Host Setup
- The following exercise would give the participant the skills to setup a Classic/Traditional Bastion Host Setup at the edge of our Network Perimeter (Though this method within AWS, specially with more robust setup is not recommended or used anymore)

## Requirements

1. VPC (1 Private, 1 Public Subnet)
2. EC2 (1 in Public Subnet, 2 Private Subnet)
3. Security (Use Security Groups to restrict Incoming and Outgoing Traffic)
4. USe SSH Keys
5. Setup the proper SSH Configurations at the Client Side
    - SSH Commands from the Client simple like `SSH Bastion` or `SSH Worker1`

## Desired Architecture
![Setup](./ec2-classic-bastion-host-setup.png)

## Tips and Tricks
- Connecting EC2 using Key Pairs [link](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair)
- Possible SSH Config At the Client Side
```txt
Host Bastion
  Hostname <Public IP of Bastion>
  Username ec2-user
  IdentityFile ~/.ssh/BASTION.pem

Host Worker1
  Hostname <Private IP of Worker1>
  Username ec2-user
  IdentityFile ~/.ssh/WORKER.pem
  ProxyJump Bastion

Host Worker2
  Hostname <Private IP of Worker2>
  Username ec2-user
  IdentityFile ~/.ssh/WORKER.pem
  ProxyJump Bastion
```