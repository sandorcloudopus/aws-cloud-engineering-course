# AWS CloudWatch - Pulbish Metrics and Logs using CloudWatch Agent
- CloudWatch Agent enables you to collect and export host-level metrics and logs on instances running Linux or Windows server.
- You can store and view the metrics that you collect with the CloudWatch agent in CloudWatch just as you can with any other CloudWatch metrics. The default namespace for metrics collected by the CloudWatch agent is CWAgent, although you can specify a different namespace when you configure the agent.
- The purpose of this exercise is to gain confidence installing and Configuring CloudWatch Agent for logs and metrics collection.

## Exercise
1. Create a VPC with Public and Private Subnets
    1. NAT Gateway + Internet Gateway
1. Run an Amazon Linux 2 Instance
    1. Attach the Appropriate IAM Role/Instance Profile
      (be able to SSH (systems manager session manager) + send metrics and logs to CloudWatch)
1. Install the CloudWatch Agent on Amazon Linux 2 Instance
1. Install also NGINX  on Amazon Linux 2 Instance
    1. Configure these tools regarding log collection
1. Configure CloudWatch Agent
1. Run CloudWatch Agent
1. Check the CloudWatch Agent Logs
1. Check the AWS Console for Metrics and Logs
1. Clean Up! Don't Forget to Delete the Resources!

## Quick Overview
![AWS CloudWatch - Pulbish Metrics and Logs using CloudWatch Agent](./cloudwatch-agent-01.png)

## Tips and Tricks
#### Installing CloudWatch Agent on AML2
`sudo yum install amazon-cloudwatch-agent`

#### CloudWatch Agent Configuration File
`/opt/aws/amazon-cloudwatch-agent/bin/config.json`

```json
{
  "agent": {
    "metrics_collection_interval": 60,
    "run_as_user": "root"
  },
  "metrics": {
    "aggregation_dimensions": [
      [
        "InstanceId"
      ]
    ],
    "append_dimensions": {
      "ImageId": "${aws:ImageId}",
      "InstanceId": "${aws:InstanceId}",
      "InstanceType": "${aws:InstanceType}"
    },
    "metrics_collected": {
      "disk": {
        "measurement": [
          "used_percent"
        ],
        "metrics_collection_interval": 60,
        "resources": [
          "/"
        ]
      },
      "mem": {
        "measurement": [
          "mem_used_percent"
        ],
        "metrics_collection_interval": 60
      },
      "procstat": [
        {
          "exe": "nginx",
          "measurement": [
            "cpu_usage",
            "memory_rss"
          ]
        }
      ]
    }
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/nginx/access.log",
            "log_group_name": "nginx-access",
            "log_stream_name": "{instance_id}"
          },
          {
            "file_path": "/var/log/nginx/error.log",
            "log_group_name": "nginx-error",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  }
}
```
#### Starting the CloudWatch Agent as a Service
`sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json`

## Resources
1. [Detailed Blog of CloudWatch Agent](https://cloudvisor.co/aws-devops-support/cloudvisor-monitoring-solution-aws-cloudwatch-agent/)
1. [Installing CloudWatch Agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-on-EC2-Instance.html)