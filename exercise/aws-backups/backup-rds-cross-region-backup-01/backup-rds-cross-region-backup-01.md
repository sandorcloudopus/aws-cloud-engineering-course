# AWS Backup - RDS Cross Region Backup with PITR
The purpose of this excercise is to demonstrate how to set up Cross Region Backup with Point In Time Recovery for RDS

For added disaster recovery capability, you can configure your Amazon RDS database instance to replicate snapshots and transaction logs to a destination AWS Region of your choice. When backup replication is configured for a DB instance, RDS initiates a cross-Region copy of all snapshots and transaction logs as soon as they are ready on the DB instance.

Also keep in mind there is a Source and Destination Region combatibility setting in place

## Requirements
1. Create an RDS Instance in Region A
    1. Enable automated backups - don't enable cross region replication yet
1. Populate the RDS Instance with some data
1. Create a KMS Key in Region B
1. Enable Cross Region Replication for the RDS Automated Backup
1. Examine the behavior
1. Recover the RDS Instance in Region B
1. Query the Data of the RDS Instance in Region B
1. Clean Up! Don't Forget to Delete the Resources

## Desired Architecture
![AWS Backup - RDS Cross Region Backup with PITR](./backup-rds-cross-region-backup-01.png)

## Tips and Tricks
#### Connecting to PostgreSQL Database
```sh
psql "host=<db hostname> port=5432 user=postgres dbname=postgres"
```
##### Insert large amount of tuples into the database
```sql
INSERT INTO test (id) SELECT g.id FROM generate_series(1, 1000000) AS g (id);
```
## Resources
1. [Replicating automated backups to another AWS Region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReplicateBackups.html)