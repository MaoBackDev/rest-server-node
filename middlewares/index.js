const validateFields  = require("../middlewares/user-validate");
const validateJWT  = require("../middlewares/validateJWT");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles
}
