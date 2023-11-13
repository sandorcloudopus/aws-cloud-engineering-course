# AWS RDS - Encrypt an unencrypted database instance
In the following lecture I would like to demonstrate how to encrypt an unencrypted database instance. Amazon RDS can encrypt your Amazon RDS DB instances. Data that is encrypted at rest includes the underlying storage for DB instances, its automated backups, read replicas, and snapshots. Amazon RDS encrypted DB instances use the industry standard AES-256 encryption algorithm to encrypt your data on the server that hosts your Amazon RDS DB instances. After your data is encrypted, Amazon RDS handles authentication of access and decryption of your data transparently with a minimal impact on performance. You don't need to modify your database client applications to use encryption. We are going to work with PostgreSQL 15 Engine.

## Requirements (steps)
1. Create an RDS Database instance without Encryption at Rest enabled.
    1. Populate the Database Instance with some data
1. Create a snapshot of the Database Instance
1. Make a copy of the snapshot of the Database Instance (Enable Encryption)
1. Restore the encrypted snapshot to a new Database Instance
1. Connect to the Restored Database with the Client/Application - (Different Connection String)
    1. Check if the Database Objects that you have created before are still present 
1. Clean Up the Resources

## Desired Architecture


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

## Resources
1. [RDS Database Encryption](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html)
1. [Copying a DB Snapshot](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CopySnapshot.html)
