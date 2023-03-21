import db from "../config/db.js";

export async function countLikes(idUser, idPost) {
    try {
        const { rows: countLike } = await db.query(`SELECT count(*) FROM likes WHERE post_id=$1`, [idPost])

        return countLike[0].count
    } catch (error) {
        console.log(error)

    }
}
export async function newLike(idUser, idPost) {
    try {
        await db.query(`INSERT INTO likes (user_id,post_id, status) VALUES($1,$2, $3)`, [idUser, idPost, false])
    } catch (error) {
        console.log(error)
    }

}
export async function unlike(idUser, idPost) {

    try {
        await db.query(`DELETE FROM likes WHERE user_id=$1 AND post_id=$2`, [idUser, idPost])

    } catch (error) {
        console.log(error)

    }
}
export async function twoUsers(idPost) {
    try {
        const result = await db.query(`SELECT name FROM users JOIN likes ON users.id = likes.user_id WHERE likes.post_id=$1 LIMIT 2`, [idPost])
        return result.rows
    } catch (error) {
        console.log(error)
    }

}
export async function youLike(idUser, idPost) {
    try {
        const result = await db.query(`SELECT * FROM likes WHERE user_id=$1 AND post_id=$2 limit 1`, [idUser, idPost])
        return result.rows[0]?.status ? true : result.rows[0]?.status
    } catch (error) {
        console.log(error)
    }

}