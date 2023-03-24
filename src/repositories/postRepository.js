import db from "../config/db.js";
import dayjs from "dayjs";

export async function getPostsRepository(date, offset) {
  const resultPost = await db.query(
    `
    SELECT p.id, p.description, p.external_link, p.publish_date, p.user_id, u.name, u.profile_picture, u.id AS user_id
    FROM posts p 
    JOIN users u ON p.user_id = u.id
    WHERE p.publish_date < $1
    ORDER BY p.publish_date DESC
    LIMIT 10
    OFFSET $2;
    `,
    [date, offset]
  );
  return resultPost;
}

export async function registerPostRepository(
  userId,
  description,
  externalLink
) {
  const date = dayjs();
  const result = await db.query(
    `
    INSERT INTO posts (user_id, description, external_link, publish_date)
    VALUES ($1, $2, $3, $4) RETURNING id`,
    [userId, description, externalLink, date]
  );
  return result.rows[0].id;
}

export async function alterPostRepository(postId, userId, description) {
  const postUserId = await db.query(`SELECT user_id FROM posts WHERE id = $1`, [
    postId,
  ]);
  const validUser = postUserId.rows[0].user_id === userId;

  if (validUser) {
    await db.query(`UPDATE posts SET description = $1 WHERE id = $2`, [
      description,
      postId,
    ]);
    return validUser;
  } else {
    return validUser;
  }
}

export async function deletePostRepository(postId, userId) {
  const postUserId = await db.query(`SELECT user_id FROM posts WHERE id = $1`, [
    postId,
  ]);
  const validUser = postUserId.rows[0].user_id === userId;

  if (validUser) {
    await db.query(`DELETE FROM post_hashtags WHERE post_id = $1`, [postId]);
    await db.query(`DELETE FROM posts WHERE id = $1`, [postId]);
    return validUser;
  } else {
    return validUser;
  }
}
