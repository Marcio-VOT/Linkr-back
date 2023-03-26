import { createFollower, deleteFollow, getFollow, getQuantityFollowing } from "../repositories/follow.repository.js";

export const followController = {
    async follow(req, res) {
        const { userId } = req.body;
        const { userId: followerId } = res.locals;

        try {
            if(followerId === userId){
                return res.sendStatus(409)
            }

            const result = await getFollow({followerId, userId})

            if(result.length > 0){
                return res.sendStatus(409)
            }

            await createFollower({ followerId, userId })
            return res.sendStatus(201)
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    },

    async unfollow(req, res){
        const { userId } = req.params;
        const { userId: followerId } = res.locals;

        try {
            const result = await getFollow({followerId, userId})

            if(result.length === 0){
                return res.sendStatus(404)
            }

            await deleteFollow({ followerId, userId })
            return res.sendStatus(200)
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },

    async verifyFollow(req, res){
        const {userId} = req.params
        const {userId : followerId} = res.locals

        try {
            const responseData = await getFollow({followerId, userId})
            return res.send(responseData)
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },

    async quantityFollowing(req, res){
        const {userId: followerId} = res.locals
        try {
            const result = await getQuantityFollowing({followerId})
            return res.send(result[0])
        } catch (error) {
            console.log(error)
            res.status(500).send()   
        }
        

    }
}
