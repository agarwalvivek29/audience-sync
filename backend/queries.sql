-- get all table names from the databse
SELECT
  table_name
FROM
  information_schema.tables
WHERE
  table_schema = 'public';

