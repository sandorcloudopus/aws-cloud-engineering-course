# Setting Up Client VPN with Mutual Authentication - using Client and Server Sertificates

## Instructions

1. Clone the OpenVPN easy-rsa repo to your local computer and navigate to the easy-rsa/easyrsa3 folder
- `git clone https://github.com/OpenVPN/easy-rsa.git`
- `cd easy-rsa/easyrsa3`

2. Initialize a new PKI environment.
- `./easyrsa init-pki`
```
Notice
------
'init-pki' complete; you may now create a CA or requests.

Your newly created PKI dir is:
* /Users/**********/easy-rsa/easyrsa3/pki

Using Easy-RSA configuration:
* undefined
```


3. To build a new certificate authority (CA), run this command and follow the prompts.
- `./easyrsa build-ca nopass`
```
No Easy-RSA 'vars' configuration file exists!

Using SSL:
* openssl LibreSSL 3.3.6
.....+++++
..............................................................................+++++
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Common Name (eg: your user, host, or server name) [Easy-RSA CA]:training

Notice
------
CA creation complete. Your new CA certificate is at:
* /Users/**********/easy-rsa/easyrsa3/pki/ca.crt
```

4. Generate the **server** certificate and key.
`./easyrsa build-server-full server nopass`

```
No Easy-RSA 'vars' configuration file exists!

Using SSL:
* openssl LibreSSL 3.3.6
Generating a 2048 bit RSA private key
...+++++
.+++++
writing new private key to '/Users/***************/easy-rsa/easyrsa3/pki/29ecaf9f/temp.1.1'
-----

Notice
------
Private-Key and Public-Certificate-Request files created.
Your files are:
* req: /Users/***************/easy-rsa/easyrsa3/pki/reqs/server.req
* key: /Users/***************/easy-rsa/easyrsa3/pki/private/server.key 

You are about to sign the following certificate:
Request subject, to be signed as a server certificate 
for '825' days:

subject=
    commonName                = server

Type the word 'yes' to continue, or any other input to abort.
  Confirm request details: yes

Using configuration from /Users/***************/easy-rsa/easyrsa3/pki/29ecaf9f/temp.4.1
Check that the request matches the signature
Signature ok
The Subject's Distinguished Name is as follows
commonName            :ASN.1 12:'server'
Certificate is to be certified until Dec 24 11:57:44 2025 GMT (825 days)

Write out database with 1 new entries
Data Base Updated

Notice
------
Certificate created at:
* /Users/***************/easy-rsa/easyrsa3/pki/issued/server.crt

Notice
------
Inline file created:
* /Users/***************/easy-rsa/easyrsa3/pki/inline/server.inline
```


5. Generate the **client** certificate and key.
`./easyrsa build-client-full training-client-1 nopass`

```
No Easy-RSA 'vars' configuration file exists!

Using SSL:
* openssl LibreSSL 3.3.6
Generating a 2048 bit RSA private key
............+++++
.................................+++++
writing new private key to '/Users/***********/easy-rsa/easyrsa3/pki/6e3eab11/temp.1.1'
-----

Notice
------
Private-Key and Public-Certificate-Request files created.
Your files are:
* req: /Users/***********/easy-rsa/easyrsa3/pki/reqs/training-client-1.req
* key: /Users/***********/easy-rsa/easyrsa3/pki/private/training-client-1.key 

You are about to sign the following certificate:
Request subject, to be signed as a client certificate 
for '825' days:

subject=
    commonName                = training-client-1

Type the word 'yes' to continue, or any other input to abort.
  Confirm request details: yes

Using configuration from /Users/***********/easy-rsa/easyrsa3/pki/6e3eab11/temp.4.1
Check that the request matches the signature
Signature ok
The Subject's Distinguished Name is as follows
commonName            :ASN.1 12:'training-client-1'
Certificate is to be certified until Dec 24 11:59:31 2025 GMT (825 days)

Write out database with 1 new entries
Data Base Updated

Notice
------
Certificate created at:
* /Users/***********/easy-rsa/easyrsa3/pki/issued/training-client-1.crt

Notice
------
Inline file created:
* /Users/***********/easy-rsa/easyrsa3/pki/inline/training-client-1.inline
```

6. Generate the **client** certificate and key for a second client (Optional, I am doing because for demonstration)
`./easyrsa build-client-full training-client-2 nopass`

7. Store the certificates in a trusted location (optional step)
- Locate the cersts
```
ls pki/issued => all the crt-s
ls pki/private => all the key-s
ls pki => ca.crt
```

8. Upload certificates to ACM
- `aws acm import-certificate --certificate fileb://server.crt --private-key fileb://server.key --certificate-chain fileb://ca.crt`
- `aws acm import-certificate --certificate fileb://client1.domain.tld.crt --private-key fileb://client1.domain.tld.key --certificate-chain fileb://ca.crt`

Side note. Print the crt files properly
```
openssl x509 -in ./pki/issued/server.crt
```

### Important Note 