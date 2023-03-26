import * as searchUser from "../repositories/userSearch.js";

export const search = async (req, res) => {
  const { user } = req.params;
  const { userId } = res.locals;
  try {
    const { rows } = await searchUser.selectUser(user, userId);
    const result = await searchUser.getUserFollow(user, userId);
    const r = [...result];
    rows.forEach((item) => {
      let index = r.findIndex((element) => element.id === item.id);
      if (index === -1) {
        r.push(item);
      }
    });

    return res.send(r).status(302);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export const searchUserPosts = async (req, res) => {
  const { id } = req.params;
  const { date, offset } = req.query;
  try {
    const { rows } = await searchUser.selectUserPosts({ id, date, offset });
    console.log({ id, date, offset, rows });
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
