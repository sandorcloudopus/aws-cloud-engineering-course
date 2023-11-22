# AWS ECS - Create a Cluster with the ECS Console Wizard
- The Purpose of this exercise is to know hot to quickly provision anc ECS Cluster running on EC2s. Therefore Creating a Cluster from scratch is the best way to go.
- An Amazon ECS cluster is a logical grouping of tasks or services and infrastructure. Infrastructure consist the infrastructure capacity and network.
- A capacity provider defines the cluster capacity that Amazon ECS scales up and down of the infrastructure you specify. You must first associate the capacity provider with a cluster before you use the capacity provider.
- For Amazon ECS on Amazon EC2 users, a capacity provider consists of a capacity provider name, an Auto Scaling group. A capacity provider also consists of all of the settings for managed scaling and managed termination protection

## Requirements
1. Create an ECS Cluster with EC2 AutoScaling Capacity Provider using the Console "Wizard"

## Architecture
![AWS ECS - Create a Cluster with the ECS Console Wizard](./ecs-cluster-autoscaling-capacity-provider-with-wizard-01.png)

## Good To Know 
#### Container Instance Security Group Requirements
- Amazon ECS container instances do not require any inbound ports to be open. However, you might want to add an SSH rule so you can log into the container instance and examine the tasks with Docker commands. You can also add rules for HTTP and HTTPS if you want your container instance to host a task that runs a web server. Container instances do require external network access to communicate with the Amazon ECS service endpoint. 

## Resources
1. [Amazon EC2 Auto Scaling group capacity providers](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html)
1. [Deep dive on Cluster Auto Scaling](https://aws.amazon.com/blogs/containers/deep-dive-on-amazon-ecs-cluster-auto-scaling/)