import db from "../config/db.js";

export const insertHashtagOnDb = async (hashtag) => {
  return await db.query(
    `INSERT INTO hashtags 
    (hashtag) values ($1) RETURNING id`,
    [hashtag]
  );
};

export const insertPostHashtag = async (hashtagId, postId) => {
  return await db.query(
    `INSERT INTO post_hashtags 
  (hashtag_id, post_id) values ($1, $2)`,
    [hashtagId, postId]
  );
};

export const getHashTags = async () => {
  const fetchHashtags = await db.query(`SELECT id, hashtag from hashtags`);
  return fetchHashtags.rows;
};

export const getTagByName = async (name) => {
  const result = await db.query(
    `SELECT id from hashtags 
    WHERE hashtag = $1`,
    [name]
  );
  return result.rows;
};

export const getTagByPostId = async (postId) => {
  const query = `
  SELECT hashtags.hashtag
  FROM post_hashtags
  JOIN hashtags
  ON hashtags.id = post_hashtags.hashtag_id
  where post_hashtags.post_id = $1;
  `;
  const result = await db.query(query, [postId]);
  return result.rows.map((e) => e.hashtag) || [];
};

export const getTrendding = async () => {
  const query = "select hashtags.hashtag, count(post_hashtags.hashtag_id) as qty from post_hashtags JOIN hashtags on post_hashtags.hashtag_id = hashtags.id group by hashtags.hashtag order by qty desc limit 10;"
  const trandding = await db.query(query)
  return trandding.rows
}

export const getPostsWithHashtagId = async (hashtagId) => {
  const query = `select posts.description, posts.external_link, posts.publish_date, users.name, users.profile_picture, users.id
  from post_hashtags
  join hashtags on post_hashtags.hashtag_id = hashtags.id
  join posts on post_hashtags.post_id = posts.id
  join users on users.id = posts.user_id
  where post_hashtags.hashtag_id = $1
  group by post_hashtags.post_id, posts.description, posts.external_link, posts.publish_date, users.name, users.profile_picture, users.id limit 10;`
  try {
    const posts = await db.query(query, [hashtagId])
    return posts.rows
  } catch (error) {
    console.log(error)
    return error
  }
  return posts.rows
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
