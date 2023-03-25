import db from "../config/db.js";

export const selectUser = async (user) => {
  return await db.query(
    `SELECT id, name, profile_picture FROM users WHERE name LIKE $1;`,
    [`${user}%`]
  );
};

export const selectUserPosts = async ({ id, date, offset }) => {
  return await db.query(
    `
  SELECT * 
  FROM posts 
  WHERE user_id = $1 
  AND posts.publish_date < $2
  ORDER BY posts.publish_date DESC
  LIMIT 10
  OFFSET $3
  ;`,
    [id, date, offset]
  );
};

export const selectUserData = async (id) => {
  return await db.query(
    `SELECT id, name, profile_picture AS picture	FROM users WHERE id = $1;`,
    [id]
  );
};
