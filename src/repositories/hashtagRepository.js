import db from "../config/db.js";

export const insertHashtagOnDb = async(hashtag, post_id) => {
    const hashtag_id = await db.query(`INSERT INTO hashtag 
    (hashtag) values ($1) RETURN id`, [hashtag])
    await db.query(`INSERT INTO post_hashtags 
    (hashtag_id, post_id) values ($1, $2)`, [hashtag_id, post_id])
}

export const getHashTags = async() => {
    const fetchHashtags =  await db.query(`SELECT hashtag from hashtags`)
    return fetchHashtags.rows
}

export const getPostHashTags = async() => {
    const postHashtagsIds = await db.query(`SELECT post_id from hashtags`)
    const posts = postHashtagsIds.rows.map(async e =>  {
      return await db.query(`
      SELECT p.description, p.external_link, p.publish_date, u.name, u.profile_picture 
      FROM posts p 
      JOIN users u 
      ON p.user_id = u.id
      WHERE p."id" = $1`, [e.post_id]);
})
  return posts.rows
}

