import { createFollower, deleteFollow } from "../repositories/follow.repository";

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
            return res.sendStatus(201)
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }
}
