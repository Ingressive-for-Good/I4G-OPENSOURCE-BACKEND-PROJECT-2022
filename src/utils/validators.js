// const mongoose = require("mongoose");

// const isString = (value) =>
//   typeof value === "string" || value instanceof String;

// const isNumber = (value) => typeof value === "number" && Number.isFinite(value);

// const isArray = (value) => Array.isArray(value);

// const isFunction = (value) => typeof value === "function";

// const isObject = (value) =>
//   value && typeof value === "object" && value.constructor === Object;

// const isNull = (value) => value === null;

// const isUndefined = (value) => typeof value === "undefined";

// const isBoolean = (value) => typeof value === "boolean";

// const isRegex = (value) =>
//   value && typeof value === "object" && value.constructor === RegExp;

// const isError = (value) =>
//   value instanceof Error && typeof value.message !== "undefined";

// const isDate = (value) => value instanceof Date;

// const isSymbol = (value) => typeof value === "symbol";

// /**
//  * Validates email
//  * @param {string} email
//  * @return {Boolean} true or false
//  */
// const validateEmail = (email) => {
//   const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

// /**
//  * validates mongoose id
//  * @param {string} id
//  */
// const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// const isValidDate = (year, month, day) => {
//   const date = new Date(year, +month - 1, day);
//   // eslint-disable-next-line eqeqeq
//   return Boolean(+date) && date.getDate() == day;
// };

// export {
//   isArray,
//   isBoolean,
//   isDate,
//   isError,
//   isFunction,
//   isNull,
//   isNumber,
//   isObject,
//   isRegex,
//   isString,
//   isSymbol,
//   isUndefined,
//   isValidDate,
//   isValidId,
//   validateEmail,
// };
