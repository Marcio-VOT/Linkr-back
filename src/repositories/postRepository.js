import db from "../config/db.js"

export async function getPostsRepository(){
    return await db.query("SELECT * FROM posts");
}

export async function registerPostRepository(description, externalLink){
    const userId = 1;
    await db.query(`INSERT INTO posts (user_id, description, external_link) VALUES ($1, $2, $3)`, [userId, description, externalLink]);
}

export async function alterPostRepository(postId, description){
    await db.query(`UPDATE posts SET description = $1 WHERE id = $2`, [description, postId]);
}

export async function deletePostRepository(postId){
    await db.query(`DELETE FROM posts WHERE id = $1`, [postId])
}
