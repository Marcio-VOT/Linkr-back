import { getHashTags, insertHashtagOnDb, insertPostHashtag, getTagByPostId, getTagByName } from "../repositories/hashtagRepository.js";
import { alterPostRepository, deletePostRepository, getPostsRepository, registerPostRepository } from "../repositories/postRepository.js";

export async function registerPost(req, res) {
  let { description, externalLink, hashtags } = req.body;
  const userId = res.locals.userId;
  const tagRows = [];
 
  try {
    const postId = await registerPostRepository(userId, description, externalLink);
    if (!hashtags) {
      return res.sendStatus(201);
    }
    
    hashtags.forEach(async (e) => {
      const resultHashtag = await getTagByName(e)
      if (resultHashtag[0]) {
      if(tagRows[0]){
        console.log(tagRows.includes(e))
        if(tagRows.includes(e)){
          return;
        } 
      }
        await insertPostHashtag(resultHashtag[0].id, postId)
        tagRows.push(e)
        return
      }
      const resultInsertHashtag = await insertHashtagOnDb(e)
      await insertPostHashtag(resultInsertHashtag.rows[0].id, postId)
      tagRows.push(e)
      res.sendStatus(201)
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
}

export async function getPosts(req, res) {
  try {
    const resultPost = await getPostsRepository();
    const resultHashtags = await getHashTags();
    res.send({ posts: resultPost, hashtags: resultHashtags });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}

export async function deletePost(req, res) {
  const postId = req.params.id;
  const userId = res.locals.userId;

  try {
    await deletePostRepository(postId, userId);
    res.send("post deletado com sucesso");
  } catch (error) {
    res.send(error.message);
  }
}

export async function alterPost(req, res) {
  const postId = req.params.id;
  const userId = res.locals.userId;
  const { description } = req.body;

  try {
    const result = await alterPostRepository(postId, userId, description);
    if (result === true) {
      res.send("the post description was updated!");
    } else if (result === false) {
      res.status(401).send("only the creator of the post can update it");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
