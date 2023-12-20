# AWS ECR - Apply Image Scanning and Enable Scan on Push
- The puspose of this excercise is to experiment with the "Basic" scanning capability of AWS ECR Image Scanning. 
- Amazon ECR image scanning helps in identifying software vulnerabilities in your container images. The following scanning types are offered. Amazon ECR uses the Common Vulnerabilities and Exposures (CVEs) database from the open-source Clair project. 
- With basic scanning, you configure your repositories to scan on push or you can perform manual scans and Amazon ECR provides a list of scan findings.

## Requirements
1. Create a Repository
1. Push an image to the repository
1. Scan the image (first on-demand scan)
1. Enable Image Scanning at the Repository level
1. Enable Image Scanning at the Registry level
1. Test these variants
1. Clean up! Don't Forget to Delete the Resources!

## Resources
1. [AWS ECR Basic Image Scanning](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-basic.html)
1. [Clair open source project](https://github.com/quay/clair)