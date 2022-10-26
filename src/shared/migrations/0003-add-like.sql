CREATE TABLE IF NOT EXISTS "Like" (
  "id"      VARCHAR(255)  PRIMARY KEY,
  "user_id" VARCHAR(255)  NOT NULL,
  "post_id" VARCHAR(255)  NOT NULL,

  CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "User"("id")
    ON DELETE CASCADE,

  CONSTRAINT "fk_post" FOREIGN KEY ("post_id") REFERENCES "Post"("id")
    ON DELETE CASCADE
)
