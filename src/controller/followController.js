import { createFollower, deleteFollow, getFollow } from "../repositories/follow.repository";

export const followController = {
    async follow(req, res) {
        const { userId } = req.boy;
        const { userId: followerId } = res.locals;

        try {
            await createFollower({ followerId, userId })
            return res.sendStatus(201)
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    },

    async unfollow(req, res){
        const { userId } = req.boy;
        const { userId: followerId } = res.locals;

        try {
            await deleteFollow({ followerId, userId })
            return res.sendStatus(200)
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },

    async verifyFollow(req, res){
        const {userId} = req.body
        const {userId : followerId} = res.locals

        try {
            const responseData = await getFollow({followerId, userId})
            return res.send(responseData)
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }
}
