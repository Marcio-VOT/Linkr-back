import db from "../config/db.js";
import dayjs from "dayjs";
/*p.publish_date < $1 */
export async function getPostsRepository(userId, { date, offset }) {
  const resultPost = await db.query(
    `SELECT 
    posts.id, 
    posts.description, 
    posts.external_link, 
    repost.publish_date as publish_date,
    posts.user_id, 
    users.profile_picture, 
    users.name, 
    true as is_repost, 
    repost.publish_date as published_date, 
    repost.user_id as published_by
FROM 
    repost
    JOIN posts ON repost.post_id = posts.id
    JOIN users ON repost.user_id = users.id
    JOIN follow ON follow.user_id = posts.user_id
WHERE 
    follow.follower_id = $1 and repost.publish_date < $3 
UNION ALL
SELECT 
    posts.id, 
    posts.description, 
    posts.external_link, 
    posts.publish_date, 
    posts.user_id, 
    users.profile_picture, 
    users.name,  
    false as is_repost, 
    NULL as published_date, 
    NULL as published_by
FROM 
    posts
    JOIN users ON posts.user_id = users.id
WHERE 
    posts.user_id = $1 and posts.publish_date < $3 
    AND NOT EXISTS (
        SELECT 
            NULL
        FROM 
            repost
        WHERE 
            repost.post_id = posts.id
    )
UNION ALL
SELECT 
    posts.id, 
    posts.description, 
    posts.external_link, 
    posts.publish_date, 
    posts.user_id, 
    users.profile_picture, 
    users.name,  
    false as is_repost, 
    NULL as published_date, 
    NULL as published_by
FROM 
    posts
    JOIN users ON posts.user_id = users.id
    JOIN follow ON follow.user_id = posts.user_id
WHERE 
    follow.follower_id = $1 and posts.publish_date < $3
    AND NOT EXISTS (
        SELECT 
            NULL
        FROM 
            repost
        WHERE 
            repost.post_id = posts.id
    )
ORDER BY 
    publish_date DESC
LIMIT 4
OFFSET $2;

    `,
    [userId, offset, date.toISOString()]
  );
  return resultPost;
}

export async function getTotalRepost(postId){
  const count = await db.query(`select count(*) as quantityrepost from reposts where post_id = $1`, [postId])
  return count
}

export async function getUser(postId){
  const result = await db.query(`select users.name as name from users join reposts ON post_id = $1`, [postId])
  return result
}

export async function registerRepost(
  userId,
  postId
) {
  const result = await db.query(
    `
    INSERT INTO reposts (user_id, post_id)
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
    posts.id, 
    posts.description, 
    posts.external_link, 
    repost.publish_date as publish_date,
    posts.user_id, 
    users.profile_picture, 
    users.name, 
    true as is_repost, 
    repost.publish_date as published_date, 
    repost.user_id as published_by
FROM 
    repost
    JOIN posts ON repost.post_id = posts.id
    JOIN users ON repost.user_id = users.id
    JOIN follow ON follow.user_id = posts.user_id
WHERE 
    follow.follower_id = $1 and repost.publish_date > $2 
UNION ALL
SELECT 
    posts.id, 
    posts.description, 
    posts.external_link, 
    posts.publish_date, 
    posts.user_id, 
    users.profile_picture, 
    users.name,  
    false as is_repost, 
    NULL as published_date, 
    NULL as published_by
FROM 
    posts
    JOIN users ON posts.user_id = users.id
WHERE 
    posts.user_id = $1 and posts.publish_date > $2 
    AND NOT EXISTS (
        SELECT 
            NULL
        FROM 
            repost
        WHERE 
            repost.post_id = posts.id
    )
UNION ALL
SELECT 
    posts.id, 
    posts.description, 
    posts.external_link, 
    posts.publish_date, 
    posts.user_id, 
    users.profile_picture, 
    users.name,  
    false as is_repost, 
    NULL as published_date, 
    NULL as published_by
FROM 
    posts
    JOIN users ON posts.user_id = users.id
    JOIN follow ON follow.user_id = posts.user_id
WHERE 
    follow.follower_id = $1 and posts.publish_date > $2
    AND NOT EXISTS (
        SELECT 
            NULL
        FROM 
            repost
        WHERE 
            repost.post_id = posts.id
    )
ORDER BY 
    publish_date DESC
  `,
    [userId, date.toISOString()]
  );
};