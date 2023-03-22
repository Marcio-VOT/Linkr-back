import db from "../config/db.js";

export const insertHashtagOnDb = async (hashtag) => {
  return await db.query(
    `INSERT INTO hashtags 
    (hashtags) values ($1) RETURNING id`,
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
  const fetchHashtags = await db.query(`SELECT id, hashtags from hashtags`);
  return fetchHashtags.rows;
};

export const getTagByName = async (name) => {
  const result = await db.query(
    `SELECT id from hashtags 
    WHERE hashtags = $1`,
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
  const query = "select hashtags.hashtags, count(post_hashtags.hashtag_id) as qty from post_hashtags JOIN hashtags on post_hashtags.hashtag_id = hashtags.id group by hashtags.hashtag order by qty desc limit 10;"
  const trandding = await db.query(query)
  return trandding.rows
}

export const getPostsWithHashtagId = async (hashtagId) => {
  const query = `select posts.description, posts.external_link, posts.publish_date, users.name, users.profile_picture, users.id as user_id
  from post_hashtags
  join hashtags on post_hashtags.hashtag_id = hashtags.id
  join posts on post_hashtags.post_id = posts.id
  join users on users.id = posts.user_id
  where post_hashtags.hashtag_id = $1
  group by post_hashtags.post_id, posts.description, posts.external_link, posts.publish_date, users.name, users.profile_picture, users.id;`
  try {
    const posts = await db.query(query, [hashtagId])
    return posts.rows
  } catch (error) {
    console.log(error)
    return error
  }
}
  
