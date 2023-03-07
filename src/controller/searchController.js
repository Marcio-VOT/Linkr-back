import * as searchUser from "../repositories/userSearch.js";

export const search = async (req, res) => {
  const { user } = req.params;
  try {
    const { rows } = await searchUser.selectUser(user);
    res.send(rows).status(302);
  } catch (error) {
    res.status(500).send(error);
  }
};
