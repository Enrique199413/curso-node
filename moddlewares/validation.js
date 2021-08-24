const { objectUtils } = require("../utils/utils");

const validData = (req, res, next) => {
  const { message: messageValidObjectStructure, canContinue: isValidBody } =
    objectUtils.existPropertiesOnObject(
      req.body,
      "name",
      "lastName",
      "surName"
    );
  if (!isValidBody) {
    return res.status(400).json({ message: messageValidObjectStructure });
  }

  const { message: messageValidValuesOnKeys, canContinue: isValidValuesBody } =
    objectUtils.allKeyWithValidData(req.body);
  if (!isValidValuesBody) {
    return res.status(400).json({ message: messageValidValuesOnKeys });
  }
  next();
};

module.exports.validData = validData;
