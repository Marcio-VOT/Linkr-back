import db from "../config/db.js"

export const getPostsRepository = async () => {
    return await db.query(`SELECT * FROM posts`);
}