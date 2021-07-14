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
  const canContinue = params.name || params.lastName || params.surName !== "";

  return sendMessage(canContinue ? "Busqueda" : "No busqueda", canContinue);
};

existPropertiesOnObject({}, "name", "lastName", "surName");

const objectUtils = {
  existPropertiesOnObject,
  allKeysWithValidData,
  searchUser,
};

module.exports = { objectUtils, stringUtils };
