import { countLikes, newLike, twoUsers, unlike, youLike } from "../repositories/like.repository.js";

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

        res.status(201).send('ok')
    } catch (error) {
        res.status(500).send(error);
    }

}
export async function removeLike(req, res) {
    const { userId, postId } = req.body
    try {
        await unlike(userId, postId)

        res.status(200).send('ok')
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

export async function getTwoUsers(req, res) {
    const {postId} = req.body

    try {
        const users =  await twoUsers(postId)
        
        res.status(200).send(users)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}
export async function getYouLike(req,res){
    const { userId, postId } = req.body

    try {
        const status = await youLike(userId, postId)
        console.log(status)
        res.status(200).send(status)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}