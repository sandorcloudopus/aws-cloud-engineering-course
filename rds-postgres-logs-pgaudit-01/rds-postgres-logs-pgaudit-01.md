# AWS RDS PostgreSQL - Logging and Audit with pgaudit extension and CloudWatch
In the following lecture I would like to demonstrate how to send Database logs to ClouWatch. Also enabling `pgAudit` would help in many auditing scenarios for your setup.

## Requirements (steps)
1. Create a Database Instance (PostgreSQL 15 Engine)
1. Create a Custom Parameter Group - Preload pgaudit lib
1. Enable also to log different connections
1. Play with the `pgaudit.log` parameter in the Parameter Group
    1. Try out the different levels.
1. Examine the behaviour of the different log levels - in the logs.
1. Stream the logs to  CloudWatch

## Desired Architecture
![DA](./rds-postgres-logs-pgaudit-01.png)

## Tips and Tricks
#### Connecting to PostgreSQL Database
```sh
psql "host=<db hostname> port=5432 user=postgres dbname=postgres"
```

#### Example Data to populate the Database
```sql
-- Create the 'purchase' table
CREATE TABLE purchase (
    purchase_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    purchase_date DATE,
    quantity INT,
    total_price DECIMAL(10, 2)
);

CREATE TABLE purchase (
    purchase_id SERIAL PRIMARY KEY
);

-- Insert some sample data into the 'purchase' table
INSERT INTO purchase (product_name, purchase_date, quantity, total_price)
VALUES
    ('Product A', '2023-01-01', 3, 150),
    ('Product B', '2023-02-15', 2, 100),
    ('Product C', '2023-03-10', 1, 75),
    ('Product A', '2023-04-05', 5, 250),
    ('Product B', '2023-05-20', 4, 200);

-- Display the contents of the 'purchase' table
SELECT * FROM purchase;
```

#### Parameters to change during this lecture
- `log_connections	1`
- `pgaudit.log	write`
- `shared_preload_libraries	pg_stat_statements,pgaudit`

#### Enable pgAudit
```sql
-- showing preloaded libs

SHOW shared_preload_libraries;

-- expect `pgaudit` be there
```

```sql
-- create the pgAudit extension
CREATE EXTENSION pgaudit;
```


## Resources
1. [PostgreSQL log files](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.PostgreSQL.html#USER_LogAccess.Concepts.PostgreSQL.PublishtoCloudWatchLogs)
1. [pgAudit docs](https://github.com/pgaudit/pgaudit/blob/master/README.md)
1. [pgAudit page](https://www.pgaudit.org/#section_three)
1. [working with PostgreSQL Logs blog post](https://aws.amazon.com/blogs/database/working-with-rds-and-aurora-postgresql-logs-part-1/)
1. [RDS PostgreSQL Extenstions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.Extensions.html#Appendix.PostgreSQL.CommonDBATasks.pgaudit)