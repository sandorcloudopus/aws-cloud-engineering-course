# AWS EC2 - Working with User Data Script/Cloud Init Directive

## Requirements

- Create fileserver using the `vsftpd` package.
- Use networking what you like
- Use User Data/Cloud init directives to finish the task
- Test with your local client 
- Bonus* -> Base64 encode the Userdata


## Desired Architecture

## Tips and Tricks
#### direct the Userdata output to the console
`exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1` 


#### Example Cloud Init Config of SFTP Server with an extra user to use
```yaml
#cloud-config
repo_update: true
repo_upgrade: all

packages:
- vsftpd

users:
- default
- name: sftpuser
  lock_passwd: true
  ssh_authorized_keys: 
  - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDdZYH6u2vrQO6jyAbDPnZLxQq1MwDIVVBE5ROj7BpO1A2CnSWBStVSQVoCJETQEsZoCfTA7x3XSLmg1i+9znGuUgDUeakf+0HneBJdvGl0VG/dXREY5HazfNJ451mF7F8gb20dAbZGoiHiX5+K6vQBLV2+1jhONXUSTvGSIfz4Bl7krQ2VvwPazKOk7m3pYj6PmyPoZDRasLW1Jx5QSF5ThtMqASqg575EEqdhgVa8hfK0I1sPUgRb845fvg4PKX01acZF4GpxfwPd5ySAsYR1CGYvaqn7Mo1EtYU2NtwWRhFk+UgZAraoWBIBXzWu9XMmqavA0wtRIG77eg32m5h3E7EBOmfI8NrcsBnGLqrD7MKpnKncgtcpg2Me+9jLRVthOPtoJE5COYCVE7b8OE7ZnEzah6HoWFWI7mbD3w++LEN9IHsowjRZ85wm0wjktcGYarVIKiP7Tj+yymgCr0v27Gj8ot7DZ7xNn7oOMLK3b5tZ6HSFu0Aqmy9zCKSdb5M= cloud@Bakos-MBP.home
write_files:
- path: /etc/vsftpd/vsftpd.conf
  permission: '0600'
  content: |
    listen=YES
    anonymous_enable=NO
    local_enable=YES
    write_enable=YES
    local_umask=022
    dirmessage_enable=YES
    xferlog_enable=YES
    connect_from_port_20=YES
    xferlog_std_format=YES
    chroot_local_user=YES
    allow_writeable_chroot=YES


runcmd:
- systemctl enable vsftpd
- systemctl start vsftpd
```

#### Connect with SFTP Client using SSH Key
`sftp -i ~/.ssh/id_rsa <user>@<host>`

## Resources
[User Data Script User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html)
[Cloud Init Reference](https://cloudinit.readthedocs.io/en/latest/reference/examples.html)
[CloudFormation Cloud Init](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/deploying.applications.html)
[Connecting to SFTP Server with Public Key (SSH)](https://superuser.com/questions/1566901/how-do-i-connect-to-sftp-with-provided-ssh-key)