import db from "../config/db.js"

export async function getPostsRepository(){
    return await db.query("SELECT * FROM posts");
}

export async function registerPostRepository({description, external_link}){
    await db.query(`INSERT INTO posts (user_id, description, external_link) VALUES ($1, $2, $3)`, [user_id, description, external_link])
}