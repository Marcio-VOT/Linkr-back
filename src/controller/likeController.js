import {
  countLikes,
  newLike,
  twoUsers,
  unlike,
  youLike,
  setLikeTrue,
} from "../repositories/like.repository.js";

export async function getLikes(req, res) {
  const { postId } = req.body;

  try {
    const likes = await countLikes(postId);
    res.status(200).send(likes);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function likeByPost(req, res) {
  const { postId } = req.body;
  const { userId } = res.locals;

  try {
    const verifyLike = await youLike(userId, postId);

    if (verifyLike.rows[0]) {
      await setLikeTrue(userId, postId);
      return res.status(201).send("ok");
    }

    await newLike(userId, postId);
    return res.status(201).send("ok");
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function removeLike(req, res) {
  const { userId, postId } = req.body;
  try {
    await unlike(userId, postId);
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getTwoUsers(req, res) {
  const { postId } = req.body;
  const { userId } = res.locals;

  try {
    const users = await twoUsers(postId, userId);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
export async function getYouLike(req, res) {
  const { userId, postId } = req.body;

  try {
    const result = await youLike(userId, postId);

    if (result.rows[0]) {
      return res.send({ status: result.rows[0].status });
    }

    res.status(200).send({ status: false });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
