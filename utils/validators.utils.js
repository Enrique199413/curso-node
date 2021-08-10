const Joi = require("joi");
const { ObjectId } = require("mongodb");

const isValidString = (string) => !!string;
const trimText = (string) => string.trim();
const stringUtils = {
  isValidString,
  trimText,
};
const sendMessage = (message = "", canContinue = false) => ({
  canContinue,
  message,
});

const compareArrays = (originalArray, comparedArray) =>
  originalArray.every((key) => comparedArray.indexOf(key) > -1);
const existsKeysOnObject = (object) => Object.keys(object).length > 0;

const existPropertiesOnObject = (body = {}, ...validProperties) => {
  const bodyKeys = Object.keys(body);
  if (existsKeysOnObject(bodyKeys)) {
    if (bodyKeys.length > validProperties.length) {
      return sendMessage("Exceeds parameters");
    } else if (bodyKeys.length < validProperties.length) {
      return sendMessage("Missing parameters");
    } else {
      const allKeysOnObject = compareArrays(validProperties, bodyKeys);
      return sendMessage(
        allKeysOnObject ? "ok" : "Keys are not equal",
        allKeysOnObject
      );
    }
  } else {
    return sendMessage("Missing parameters");
  }
};

const allKeysWithValidData = (body = {}) => {
  const validValues = [];
  for (const [key, value] of Object.entries(body)) {
    validValues.push(isValidString(trimText(value)));
  }
  const canContinue = !validValues.includes(false);
  return sendMessage(
    canContinue ? "All values on keys are valid" : "Verify values on keys",
    canContinue
  );
};

const searchUser = (params = {}) => {
  const canContinue = params.userId || params.spaceId;
  return sendMessage(canContinue ? "Busqueda" : "No busqueda", canContinue);
};

existPropertiesOnObject({}, "userId", "spaceId");

const objectUtils = {
  existPropertiesOnObject,
  allKeysWithValidData,
  searchUser,
};

async function validateId(id) {
  const schema = Joi.object({
    userId: Joi.string().min(24).max(24).required(),
    spaceId: Joi.string().min(24).max(24).required(),
  });
  const validation = schema.validate(id);
  return Promise.resolve(validation);
}

async function validateUser(user) {
  console.log("VALIDA");
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  const validation = schema.validate(user);
  return Promise.resolve(validation);
}

async function validateSpaces(spacesId, spacesCollection) {
  console.log("VALIDANDO SPACES");
  const result = await spacesId.map(async (item) => {
    const itemFounded = await spacesCollection
      .find({
        _id: new ObjectId(item),
      })
      .toArray();

    if (itemFounded.length) {
      console.log("encontro ID");
      return true;
    } else {
      return false;
    }
  });

  return Promise.resolve(result);

  // const valida = spacesId
  //   .forEach(async (itemSpace) => {
  //     const found = await spacesCollection
  //       .find({
  //         _id: new ObjectId(itemSpace),
  //       })
  //       .toArray();

  //     console.log(found);

  //     return data;
  //   })
}

module.exports = {
  objectUtils,
  stringUtils,
  validateId,
  validateUser,
  validateSpaces,
};
