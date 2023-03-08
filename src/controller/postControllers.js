import { getPostsRepository } from "../repositories/postRepository.js";

export async function registerPost(req, res){
    try {
        
    } catch (error) {
        
    }
}

export async function getPosts(req, res){
    try {
        res.send(getPostsRepository.rows);
    } catch (error) {
        res.send(error.message)
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