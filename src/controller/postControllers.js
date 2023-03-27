import {
  getHashTags,
  insertHashtagOnDb,
  insertPostHashtag,
  getTagByName,
} from "../repositories/hashtagRepository.js";
import {
  alterPostRepository,
  deletePostRepository,
  getPostsRepository,
  postsCount,
  registerPostRepository,
} from "../repositories/postRepository.js";

export async function registerPost(req, res) {
  let { description, externalLink, hashtags } = req.body;
  const userId = res.locals.userId;
  const tagRows = [];

  try {
    const postId = await registerPostRepository(
      userId,
      description,
      externalLink
    );

    const tagPromises = hashtags.map(async (e) => {
      const resultHashtag = await getTagByName(e);
      if (resultHashtag[0]) {
        if (!tagRows.includes(e)) {
          tagRows.push(e);
          await insertPostHashtag(resultHashtag[0].id, postId);
        }
      } else {
        const resultInsertHashtag = await insertHashtagOnDb(e);
        tagRows.push(e);
        await insertPostHashtag(resultInsertHashtag.rows[0].id, postId);
      }
    });

    await Promise.all(tagPromises);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function getPosts(req, res) {
  const { userId } = res.locals;
  try {
    const resultPost = await getPostsRepository(userId, req.query);
    res.send({ posts: resultPost.rows });
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
      res
        .status(401)
        .send("only the creator of the post can update the post description");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function countNewPosts(req, res) {
  const { date } = req.query;
  const { userId } = res.locals;
  try {
    const { rowCount } = await postsCount({ date, userId });
    return res.status(200).send(`${rowCount}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
