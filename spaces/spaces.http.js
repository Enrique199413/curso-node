const { getSpaces } = require("./spaces.controller");

const spacesHttp = async (req, res) => {
  try {
    const allSpaces = await getSpaces();
    res.status(200).json(allSpaces);
  } catch (error) {
    res.status(400).json({ meessage: error });
  }
};

module.exports = spacesHttp;
