CREATE TABLE IF NOT EXISTS "User" (
  "id"          VARCHAR(255)  PRIMARY KEY,

  "updated_at"  TIMESTAMP     NOT NULL,
  "created_at"  TIMESTAMP     NOT NULL,
  "password"    VARCHAR(255)  NOT NULL,
  "username"    VARCHAR(255)  NOT NULL  UNIQUE,
  "email"       VARCHAR(255)  NOT NULL  UNIQUE,

  "short_bio"   VARCHAR(20),
  "bio"         VARCHAR(255),
  "full_name"   VARCHAR(255),
  "avatar"      BYTEA         --Blob equivalent
);

--  BLOB (Binary Large Object)
--  Can be complex files like images or videos
