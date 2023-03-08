import { getPostsRepository } from "../repositories/postRepository.js";

export async function registerPost(req, res){
    try {
        
    } catch (error) {
        
    }
}

export async function getPosts(req, res){
    try {
        const result = await getPostsRepository();
        res.send(result.rows);
    } catch (error) {
        res.send(error.message);
    }
}

export async function deletePost(req, res){
    try {
        
    } catch (error) {
        
    }
}

export async function alterPost(req, res){
    try {
        
    } catch (error) {
        
    }
}