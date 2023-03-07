import db from "../config/db.js";

export const selectUser = async (user) => {
  return await db.query(
    `SELECT id, name, profile_picture FROM users WHERE name LIKE $1;`,
    [`${user}%`]
  );
};
