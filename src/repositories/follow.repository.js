import db from "../config/db.js";

export async function createFollower({followerId, userId}){
    const query = 'insert into follow (follower_id, user_id) values ($1, $2);'
    const result = await db.query(query, [followerId, userId])
    return result;
}

export async function deleteFollow({followerId, userId}){
    const query = 'delete from follow where follower_id = $1 and user_id = $2;'
    const result = await db.query(query, [followerId, userId])
    return result;
}

export async function getFollow({followerId, userId}){
    const query = 'select * from follow where follower_id = $1 and user_id=$2;'
    const result = await db.query(query, [followerId, userId])
    return result.rows
}

export async function getQuantityFollowing({followerId}){
    const query = "select count(*) as quantityFollowing from follow where follower_id=$1"
    const result = await db.query(query, [followerId])
    return result.rows
}
