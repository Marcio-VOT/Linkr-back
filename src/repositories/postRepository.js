import db from "../config/db.js"

export async function getPostsRepository(){
    return await db.query("SELECT * FROM posts");
}