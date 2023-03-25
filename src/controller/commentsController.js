import { getCommentsRepository, registerCommentRepository } from "../repositories/commentsRepositories.js";

export async function getComments(req, res){
    const postId = req.params.id;
    try {
        const result = await getCommentsRepository(postId);
        res.send(result.rows)
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export async function registerComment(req, res){
    const { userId, postId, comment} = req.body;
    try {
        await registerCommentRepository(userId, postId, comment);
        res.status(201).send("Comment registered successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}