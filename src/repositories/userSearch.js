import db from "../config/db.js";

export const selectUser = async (userName, userId) => {
  return await db.query(
    `SELECT users.id, users.name, users.profile_picture FROM users where name like $1 and id <> $2;`,
    [`${userName}%`, userId]
  );
};

export const getUserFollow = async (userName, userId) => {
  const query =
    "SELECT users.id, users.name, users.profile_picture FROM users join follow on users.id = follow.user_id WHERE name LIKE $1 and follow.follower_id = $2;";
  const result = await db.query(query, [`${userName}%`, userId]);
  return result.rows;
};

export const selectUserPosts = async ({ id, date, offset }) => {
  return await db.query(
    `
  SELECT * 
  FROM posts 
  WHERE user_id = $1 
  AND posts.publish_date < $2
  ORDER BY posts.publish_date DESC
  LIMIT 4
  OFFSET $3
  ;`,
    [id, date.toISOString(), offset]
  );
};

export const selectUserData = async (id) => {
  return await db.query(
    `SELECT id, name, profile_picture AS picture	FROM users WHERE id = $1;`,
    [id]
  );
};
