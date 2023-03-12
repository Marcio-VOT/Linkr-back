import { getHashTags, insertHashtagOnDb, insertPostHashtag, getTagByPostId, getTagByName } from "../repositories/hashtagRepository.js";
import { alterPostRepository, deletePostRepository, getPostsRepository, registerPostRepository } from "../repositories/postRepository.js";

export async function registerPost(req, res) {
  let { description, externalLink, hashtags } = req.body;
  const userId = res.locals.userId;
  const tagRows = [];

  try {
    const postId = await registerPostRepository(userId, description, externalLink);
    if (hashtags.length === 0) {
      return res.sendStatus(201);
    }

    hashtags.forEach(async (e, i) => {
      const resultHashtag = await getTagByName(e)
      if (resultHashtag[0]) {
        if (tagRows[0]) {
          console.log(tagRows.includes(e))
          if (tagRows.includes(e)) {
            if (hashtags.length - 1 === i) {
              console.log(tagRows)
              console.log("------")
              return res.sendStatus(201)
            }
            return;
          }
        }
        tagRows.push(e)
        await insertPostHashtag(resultHashtag[0].id, postId)
        if (hashtags.length - 1 === i) {
          return res.sendStatus(201)
        }
        return
      }
      const resultInsertHashtag = await insertHashtagOnDb(e)
      tagRows.push(e)
      await insertPostHashtag(resultInsertHashtag.rows[0].id, postId)
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
    const result = await deletePostRepository(postId, userId);
    if (result === true) {
      res.send("the post was deleted with sucess!");
    } else if (result === false) {
      res.status(401).send("only the creator of the post can delete the post");
    }
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
      res.status(401).send("only the creator of the post can update the post description");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
