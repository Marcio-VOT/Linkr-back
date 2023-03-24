import * as searchUser from "../repositories/userSearch.js";

export const search = async (req, res) => {
  const { user } = req.params;
  try {
    const { rows } = await searchUser.selectUser(user);
    return res.send(rows).status(302);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const searchUserPosts = async (req, res) => {
  const { id } = req.params;
  const { date, offset } = req.body;
  try {
    const { rows } = await searchUser.selectUserPosts({ id, date, offset });
    return res.send(rows).status(302);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const searchUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await searchUser.selectUserData(id);
    return res.send(rows).status(302);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
