const jwt = require('jsonwebtoken');

/**
 * This funtion signs a new json web token. use the method sign() from jsonwebtoken library
 * wich, receives two parameters (payload, SECRET_KEY)
 * Payload contains just uid from user and SECRET_KEY is an enviroment variable. 
 * @param {*} uid 
 * @returns jwt
 */

const generateJWT = (uid = '') => {

  return new Promise((resolve, reject) => {

    const payload = {uid};
    jwt.sign(payload, process.env.SECRET_OR_PRIVETE_KEY, {
      expiresIn: '4h'
    }, (err, token) => {

      if(err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      } 
    })
  })

}

module.exports = {
  generateJWT
}