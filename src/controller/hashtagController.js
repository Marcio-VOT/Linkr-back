import {
  getTagByName,
  getPostsWithHashtagId,
  getTrendding,
} from "../repositories/hashtagRepository.js";

export async function PostHashTags(req, res) {
  const { date, offset } = req.query;
  try {
    const { hashtag } = req.params;
    const [tagId] = await getTagByName(`#${hashtag}`);
    const posts = await getPostsWithHashtagId({
      hashtagId: tagId.id,
      date,
      offset,
    });
    return res.send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function trendding(req, res) {
  try {
    const trenddingData = await getTrendding();
    res.send(trenddingData);
  } catch (error) {
    res.status(500).send();
  }
}
