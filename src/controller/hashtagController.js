import { getPostHashTags } from "../repositories/hashtagRepository.js";

export async function PostHashTags(req, res){
  try {
      const hashtags = getPostHashTags()
      return res.send({hashtags: hashtags.rows});
  } catch (error) {
      res.status(500).send(error.message);
  }
}