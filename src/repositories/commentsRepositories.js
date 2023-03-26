import db from "../config/db.js";

export async function getCommentsRepository(postId){
    try {
        const postComments = await db.query(`
        SELECT c.comment, u.id, u.name, u.profile_picture
        FROM comments c 
        JOIN users u 
        ON c.user_id = u.id
        WHERE c.post_id = $1
        ORDER BY c.id
        `, [postId]);
        return postComments;
        
    } catch (error) {
        return error.message
    }
}

export async function registerCommentRepository(userId, postId, comment){
    try {
        await db.query(`INSERT INTO comments (user_id, post_id, comment) VALUES ($1, $2, $3)`, [userId, postId, comment]);
    } catch (error) {
        return error.message
    }
}

export async function getQuantityComments({postId}){
    const query = "select count(*) as quantitycomments from comments where post_id=$1"
    const result = await db.query(query, [postId])
    return result.rows;
}