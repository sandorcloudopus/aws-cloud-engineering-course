# AWS ECS - Create a Cluster from scratch with EC2 Autoscaling Capacity Provider
- The Purpose of this exercise is to understand the different component of an ECS Cluster running on EC2s. Therefore Creating a Cluster from scratch is the best way to go.
- An Amazon ECS cluster is a logical grouping of tasks or services and infrastructure. Infrastructure consist the infrastructure capacity and network.
- A capacity provider defines the cluster capacity that Amazon ECS scales up and down of the infrastructure you specify. You must first associate the capacity provider with a cluster before you use the capacity provider.
- For Amazon ECS on Amazon EC2 users, a capacity provider consists of a capacity provider name, an Auto Scaling group. A capacity provider also consists of all of the settings for managed scaling and managed termination protection

## Architecture
![AWS ECS - Create a Cluster from scratch with EC2 Autoscaling Capacity Provider](./ecs-cluster-autoscaling-capacity-provider-from-scratch-01.png)

## Good to Know
#### Container Instance Security Group Requirements
- Amazon ECS container instances do not require any inbound ports to be open. However, you might want to add an SSH rule so you can log into the container instance and examine the tasks with Docker commands. You can also add rules for HTTP and HTTPS if you want your container instance to host a task that runs a web server. Container instances do require external network access to communicate with the Amazon ECS service endpoint. 

## Tips and Trics
#### EC2 ECS User Data Script for Optimized AMIs
```sh
#!/bin/bash
echo ECS_CLUSTER=${ECSCluster} >> /etc/ecs/ecs.config

# ${ECSCluster} is the name of the Cluster
```

#### ECS Instance Role
-> arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role

## Resources
1. [Deep dive on Cluster Auto Scaling](https://aws.amazon.com/blogs/containers/deep-dive-on-amazon-ecs-cluster-auto-scaling/)
1. [Amazon EC2 Auto Scaling group capacity providers](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html)