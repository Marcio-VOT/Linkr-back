import db from "../config/db.js";

export async function countLikes(idUser,idPost){
    try {
        const {rows:countLike } = await db.query(`SELECT count(*) FROM likes WHERE user_id=$1 AND post_id=$2 AND status=true`, [idUser,idPost])

        return countLike[0].count
    } catch (error) {
        console.log(error)

    }
}
export async function newLike(idUser,idPost){
    try {
        await db.query(`INSERT INTO likes (user_id,post_id) VALUES($1,$2)`,[idUser,idPost])
    } catch (error) {
        console.log(error)
    }

}
export async function unlike(idUser,idPost){
    
    try {
        await db.query(`DELETE FROM likes WHERE user_id=$1 AND post_id=$2`,[idUser,idPost])
        
    } catch (error) {
        console.log(error)
        
    }
}