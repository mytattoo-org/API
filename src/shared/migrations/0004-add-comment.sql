CREATE TABLE IF NOT EXISTS "Comment" (
  "id"          VARCHAR(255) PRIMARY KEY,
  "post_id"     VARCHAR(255) NOT NULL,
  "user_id"     VARCHAR(255) NOT NULL,

  "content"     VARCHAR(255) NOT NULL,
  "created_at"  TIMESTAMP    NOT NULL,
  "updated_at"  TIMESTAMP    NOT NULL,

  CONSTRAINT "fk_post" FOREIGN KEY ("post_id") REFERENCES "Post"("id")
    ON DELETE CASCADE,

  CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "User"("id")
    ON DELETE CASCADE
)
