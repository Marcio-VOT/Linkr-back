import { countLikes,newLike,unlike } from "../repositories/like.repository.js";

export async function getLikes(req, res) {
    const { userId, postId } = req.body

    try {
        const likes = await countLikes(userId, postId)

        res.status(200).send(likes)
    } catch (error) {
        res.status(500).send(error);
    }



}
export async function likeByPost(req, res) {
    const { userId, postId } = req.body

    

    try {
        await newLike(userId, postId)

        res.status(200).send('ok')
    } catch (error) {
        res.status(500).send(error);
    }

}
export async function removeLike(req,res){
    const { userId, postId } = req.body
    try {
        await unlike(userId, postId)

        res.status(200).send('ok')
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}