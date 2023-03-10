import db from "../config/db.js";

export const insertHashtagOnDb = async(hashtag) => {
    return await db.query(`INSERT INTO hashtags 
    (hashtag) values ($1) RETURNING id`, [hashtag])
}

export const insertPostHashtag = async (hashtagId, postId) => {
  return await db.query(`INSERT INTO post_hashtags 
  (hashtag_id, post_id) values ($1, $2)`, [hashtagId, postId])
}

export const getHashTags = async() => {
    const fetchHashtags =  await db.query(`SELECT id, hashtag from hashtags`)
    return fetchHashtags.rows
}

export const getTagByName = async (name) => {
  const result = await db.query(
    `SELECT id from hashtags 
    WHERE hashtag = $1`,
    [name]
  );
  return result.rows
}

export const getPostHashTags = async (hashtag) => {
  const postHashtagsIds = await db.query(
    `SELECT id from hashtags 
    WHERE hashtag = $1`,
    [hashtag]
  );
  
  const posts = postHashtagsIds.rows.map(async (e) => {
    return await db.query(
      `
      SELECT p.description, p.external_link, p.publish_date, u.name, u.profile_picture 
      FROM posts p 
      JOIN users u 
      ON p.user_id = u.id
      WHERE p."id" = $1`,
      [e.post_id]
    );
  });
  return posts.rows;
};
