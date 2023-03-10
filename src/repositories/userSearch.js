import db from "../config/db.js";

export const selectUser = async (user) => {
  return await db.query(
    `SELECT id, name, profile_picture FROM users WHERE name LIKE $1;`,
    [`${user}%`]
  );
};

export const selectUserPosts = async (id) => {
  return await db.query(
    `
  SELECT * 
  FROM posts 
  WHERE user_id = $1
  ORDER BY posts.publish_date DESC
  LIMIT 20
  ;`,
    [id]
  );
};

export const selectUserData = async (id) => {
  return await db.query(
    `SELECT id, name, profile_picture AS picture	FROM users WHERE id = $1;`,
    [id]
  );
};
