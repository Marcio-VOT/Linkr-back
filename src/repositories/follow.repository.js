import db from "../config/db.js";

export async function createFollower({followerId, userId}){
    const query = 'insert into follow (follower_id, user_id) values (folloedId, userId);'
    const result = await db.query(query, [followerId, userId])
    return result;
}

export async function deleteFollow({followerId, userId}){
    const query = 'delete from follow where follower_id = $1 and user_id = $2;'
    const result = await db.query(query, [followerId, userId])
    return result;
}
