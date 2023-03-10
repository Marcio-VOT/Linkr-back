import { getHashTags, insertHashtagOnDb, inserPostHashtag } from "../repositories/hashtagRepository.js";
import { alterPostRepository, deletePostRepository, getPostsRepository, registerPostRepository } from "../repositories/postRepository.js";

export async function registerPost(req, res) {
  const { description, externalLink, hashtag } = req.body;
  const userId = res.locals.userId;

  try {
    const resultPost = await registerPostRepository(userId, description, externalLink);
    console.log(hashtag)
    if (!hashtag) {
      return res.status(201).send("Post criado");
    }
    const resultHashtag = await getHashTags(hashtag)
    if (resultHashtag[0]) {
      await inserPostHashtag(resultHashtag[0].id, resultPost[0].id)
    }
    const resultInserHashtag = await insertHashtagOnDb(hashtag)
    await inserPostHashtag(resultInserHashtag.rows[0].id, resultPost[0].id)
    return res.status(201).send("Post criado")

  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function getPosts(req, res) {
  try {
    const resultPost = await getPostsRepository();
    const resultHashtags = await getHashTags();
    res.send({ posts: resultPost.rows, hashtags: resultHashtags });
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
    res.send("post deletado com sucesso").status(200);
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
      res.send("the post description was updated!").status(200);
    } else if (result === false) {
      res.send("only the creator of the post can update it");
    }
  } catch (error) {
    res.send(error.message);
  }
}
