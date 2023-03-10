import { getHashTags, insertHashtagOnDb } from "../repositories/hashtagRepository.js";
import { alterPostRepository, deletePostRepository, getPostsRepository, registerPostRepository } from "../repositories/postRepository.js";

export async function registerPost(req, res){
    const {description, externalLink, hashtag} = req.body;
    const userId = res.locals.userId;

    try {
        const post_id = await registerPostRepository(userId, description, externalLink);
        if(!hashtag) res.send("Post criado").status(201);
        else{
            insertHashtagOnDb(hashtag, post_id)
            res.send("Post criado").status(201)
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getPosts(req, res){
    try {
        const resultPost = await getPostsRepository();
        const resultHashtags = await getHashTags()
        res.send({posts: resultPost.rows, hashtags: resultHashtags.rows});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deletePost(req, res){
    const postId = req.params.id;
    const userId = res.locals.userId;
    
    try {
        await deletePostRepository(postId, userId);
        res.send("post deletado com sucesso").status(200);
    } catch (error) {
        res.send(error.message);
    }
}

export async function alterPost(req, res){
    const postId = req.params.id;
    const userId = res.locals.userId;
    const {description} = req.body;

    try {
        const result = await alterPostRepository(postId, userId, description);
        if(result === true){
            res.send("the post description was updated!").status(200);   
        } else if (result === false){
            res.send("only the creator of the post can update it");
        }
             
    } catch (error) {
        res.send(error.message);
    }
}