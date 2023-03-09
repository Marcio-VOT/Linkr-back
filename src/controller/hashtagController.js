import { getPostHashTags } from "../repositories/hashtagRepository.js";

export async function PostHashTags(req, res){
  try {
      const {hashtag} = req.params 
      const hashtags = getPostHashTags(hashtag)
      return res.send({hashtags: hashtags.rows});
  } catch (error) {
      res.status(500).send(error.message);
  }
}