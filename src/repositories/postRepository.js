import db from "../config/db.js";
import dayjs from "dayjs";
/*p.publish_date < $1 */
export async function getPostsRepository(userId, { date, offset }) {
  const resultPost = await db.query(
    `
    SELECT              
    COALESCE(r.id, p.id) AS id,
    COALESCE(r.user_id, p.user_id) user_id,    p.description AS description,
    p.external_link AS external_link,
    COALESCE(r.publish_date, p.publish_date) AS publish_date,
    r.user_id AS repost_user_id,
    r.publish_date AS repost_publish_date, u.name, u.profile_picture
FROM
    follow f
    JOIN posts p ON p.user_id = f.user_id
    LEFT JOIN repost r ON r.post_id = p.id AND r.user_id = f.follower_id join users u on p.user_id = u.id  
WHERE
    f.follower_id = $1 and p.publish_date < $3
    order by p.publish_date , r.publish_date desc
    limit 10
    offset $2
    `



    ,[userId, offset, date.toISOString()]
  );
  return resultPost;
}

export async function getTotalRepost(postId){
  const count = await db.query(`select count(*) as quantityrepost from repost where post_id = $1`, [postId])
  return count
}

export async function getUser(postId){
  const result = await db.query(`select users.name as name from users where id = $1`, [postId])
  return result
}

export async function registerRepost(
  userId,
  postId
) {
  const result = await db.query(
    `
    INSERT INTO repost (user_id, post_id)
    VALUES ($1, $2)`,
    [userId, postId]
  );
  return 
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

export const postsCount = async ({ date, userId }) => {
  return await db.query(
    `
    SELECT              
    COALESCE(r.id, p.id) AS id,
    COALESCE(r.user_id, p.user_id) user_id,
    p.description AS description,
    p.external_link AS external_link,
    COALESCE(r.publish_date, p.publish_date) AS publish_date,
    r.user_id AS repost_user_id,
    r.publish_date AS repost_publish_date, u.name, u.profile_picture
FROM
    follow f
    JOIN posts p ON p.user_id = f.user_id
    LEFT JOIN repost r ON r.post_id = p.id AND r.user_id = f.follower_id join users u on p.user_id = u.id  
WHERE
    f.follower_id = $1 and p.publish_date > $2
    order by p.publish_date , r.publish_date desc
    `
    ,[userId, date.toISOString()]
  );
};
