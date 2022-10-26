CREATE TABLE IF NOT EXISTS "User" (
  "id"          VARCHAR(255)  PRIMARY KEY,

  "updated_at"  TIMESTAMP     NOT NULL,
  "created_at"  TIMESTAMP     NOT NULL,
  "password"    VARCHAR(255)  NOT NULL,
  "username"    VARCHAR(255)  NOT NULL,
  "email"       VARCHAR(255)  NOT NULL  UNIQUE,
  "artist"      BOOLEAN       NOT NULL  DEFAULT false,

  "avatar"      BYTEA, --Blob equivalent
  "short_bio"   VARCHAR(20),
  "bio"         VARCHAR(255),
  "full_name"   VARCHAR(255)
);
