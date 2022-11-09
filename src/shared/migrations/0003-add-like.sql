CREATE TABLE IF NOT EXISTS "Like" (
  "user_id" VARCHAR(255),
  "post_id" VARCHAR(255),

  CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "User"("id")
    ON DELETE CASCADE,

  CONSTRAINT "fk_post" FOREIGN KEY ("post_id") REFERENCES "Post"("id")
    ON DELETE CASCADE,

  PRIMARY KEY ("user_id", "post_id")
)

