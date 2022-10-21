CREATE TABLE IF NOT EXISTS Likes (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  post_id VARCHAR(255) NOT NULL,
  CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
