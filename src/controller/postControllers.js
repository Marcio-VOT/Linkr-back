import { alterPostRepository, deletePostRepository, getPostsRepository, registerPostRepository } from "../repositories/postRepository.js";

export async function registerPost(req, res){
    const {description, externalLink} = req.body;
    console.log(req.body);
    try {
        await registerPostRepository(description, externalLink);
        res.send("Post criado").status(201);
    } catch (error) {
        res.send(error.message);
    }
}

export async function getPosts(req, res){
    try {
        const result = await getPostsRepository();
        console.log(result);
        res.send(result.rows);
    } catch (error) {
        res.send(error.message);
    }
}

export async function deletePost(req, res){
    const userId = req.params.id;
    
    try {
        await deletePostRepository(userId);
        res.send("post deletado com sucesso").status(200);
    } catch (error) {
        res.send(error.message);
    }
}

export async function alterPost(req, res){
    const userId = req.params.id;
    const {description} = req.body;

    try {
        await alterPostRepository(userId, description);
        res.send("Post alterado com sucesso").status(200);        
    } catch (error) {
        res.send(error.message);
    }
}