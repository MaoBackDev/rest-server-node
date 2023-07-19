const validatExpres  = require("./validate-express");
const validateJWT    = require("../middlewares/validateJWT");
const validateRoles  = require("../middlewares/validate-roles");
const validateFields = require("../middlewares/validate-fields");
const validateFile = require('./validate-file');

module.exports = {
  ...validatExpres,
  ...validateJWT,
  ...validateRoles,
  ...validateFields,
  ...validateFile
}
