CREATE TABLE IF NOT EXISTS "Post" (
  "id"          VARCHAR(255)  PRIMARY KEY,
  "user_id"     VARCHAR(255)  NOT NULL,

  "image"       BYTEA         NOT NULL,
  "created_at"  TIMESTAMP     NOT NULL,
  "updated_at"  TIMESTAMP     NOT NULL,

  "description" VARCHAR(255),

  CONSTRAINT "fk_user" FOREIGN KEY("user_id") REFERENCES "User"("id")
    ON DELETE CASCADE
)

-- ON UPDATE RESTRICT (default):
-- Will throw an error if User PK is changed

-- ON DELETE CASCADE:
-- Will delete Post if User is deleted
