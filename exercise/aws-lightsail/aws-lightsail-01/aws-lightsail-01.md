# AWS Lightsail - Deploy a Web-Application to AWS Lightsail Platform

- The purpose of this exercise is to demonstrate the different capabilities of the AWS Lightsail Platform, hosting web-applications, setting up TLS/SSL Termination, mounting an AWS EFS to the Lightsail Instance

## Requirements
1. Create a Lightsail Instance
1. Deploy the Attached (or any other webapplication into it)
1. Configure a Reverse Proxy (NGINX)
1. Secure the Instance with SSL Termination
    1. I suggest ZeroSSL
1. Configure EFS Filesystem as a filestorage attached to the Ligthstail Instance
1. Clean Up! Don't Forget to Delete the Resources!

## Tips and Tricks
#### Copying the Application and Running It
1. Create a Lightsail instance - make sure that you have SSH connection to the instance
3. Install node.js
    - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
2. Copy the Application Folder to the Ligthsail Instance or Download with Git From and Install Git client as 
    `sudo dnf install git -y`
    `scp -r lightsail-01 <lightsail ssh>:/home/ec2-user/`
3. Run the Application
    - Without specifying environment variables it would create a new Folder at the path to the `/var/image-app/images` recursively
    - Issue the `npm run command`
    - Test if this running locally `curl localhost:5000`
4. Open up the Security Group/Firewall of the Lightsail instance at 5000 at any IP for temporary
5. Test it by visiting the ligthsail IP address  with the port specified, like: 
    In the Broswer, Type => `<IP>:5000`

#### Configuring Reverse Proxy, Domain Name and TLS
1. Install nginx
`sudo dnf upgrade --refresh -y`
`sudo dnf install nginx -y`
`sudo systemctl start nginx`
`sudo systemctl enable nginx`
2. Visit the Public IP Address of the site
3. Create a Certification using ZeroSSL
4. Bundle the certs together
`cat publiccloudtraining.com/certificate.crt publiccloudtraining.com/ca_bundle.crt > bundled.crt`
5. Upload the cert with SCP
6. Copy the Certs to the Right Place
7. Change the Nginx Config File
8. Reload NGINX
`sudo nginx -s reload`
9. Open Up the firewall in the 443 port
10. Go to the website you have made

#### Configuring EFS Mount
1. aws lightsail peer-vpc
2. aws efs create-file-system
3. Get the ID of the Subnet of the AZ
4. Create a mount target of EFS
`aws efs create-mount-target --file-system-id <EFS File System ID> --subnet-id <Subnet ID>`
5. `aws ec2 authorize-security-group-ingress --group-id <Default Security Group ID> --protocol tcp --port 2049 --cidr <Lightsail VPC CIDR>`
6. `sudo dnf install nfs-utils`
7. `sudo mount -t nfs -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport <EFS IP ADDRESS>:/ /mnt/efs`
8. `sudo chmod -R 777 /mnt/efs/`
9. `mkdir /mnt/efs/images`
10. `(IMAGE_DIR=/mnt/efs/images IMAGE_APP_ENVIRONMENT=prod node ./src/index.js&)`


## Resources
https://zerossl.com/features/validation/
https://aws.amazon.com/getting-started/hands-on/efs-and-lightsail/
https://help.zerossl.com/hc/en-us/articles/360058295894-Installing-SSL-Certificate-on-NGINX
https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/
https://www.nginx.com/resources/wiki/start/topics/examples/full/