import db from "../config/db.js";

export async function countLikes(idPost) {
    try {
        const { rows: countLike } = await db.query(`SELECT count(*) FROM likes WHERE post_id=$1 AND status = true`, [idPost])

        return countLike
    } catch (error) {
        console.log(error)
    }
}

export async function newLike(idUser, idPost) {
    try {
        await db.query(`INSERT INTO likes (user_id, post_id, status) VALUES($1,$2, $3)`, [idUser, idPost, true])
    } catch (error) {
        console.log(error)
    }
}

export async function unlike(idUser, idPost) {

    try {
        await db.query(`UPDATE likes SET status=$1 WHERE user_id=$2 AND post_id=$3`, [false, idUser, idPost])
    } catch (error) {
        console.log(error)
    }
}

export async function twoUsers(idPost, idUser) {
    try {
        const result = await db.query(`SELECT name FROM users JOIN likes ON users.id = likes.user_id WHERE likes.post_id=$1 AND likes.status = $2  and users.id <> $3 LIMIT 2`, [idPost, true, idUser])
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

export async function youLike(idUser, idPost) {
    try {
        const result = await db.query(`SELECT * FROM likes WHERE user_id=$1 AND post_id=$2 limit 1`, [idUser, idPost])
        return result
    } catch (error) {
        console.log(error)
    }

}

export async function setLikeTrue(idUser, idPost){
    try {
        await db.query(`UPDATE likes SET status=$1 WHERE user_id=$2 AND post_id=$3`, [true, idUser, idPost])
    } catch (error) {
        console.log(error)
    }
}