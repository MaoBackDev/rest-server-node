const path = require('path');
const {v4: uuidv4} = require('uuid');
const validateExtensions = ['png', 'jpg', 'jpeg', 'gift'];


const uploadFile = (files, extensions = validateExtensions, folder = '') => {

  return new Promise((resolve, reject) => {

    const {file} = files;

    // Validar extensión del archivo
    const shorName = file.name.split('.');
    const ext = shorName[shorName.length -1];

    if(!extensions.includes(ext)) {
      return reject(`La extensión ${ext} no es permitida ${extensions}`);
    }

    // Renombrar el nombre del archivo y dar un identificador único usando uuid
    const nameTemp = `${uuidv4()}.${ext}`; 
    const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(nameTemp);
    });
  })
}

module.exports = {
  uploadFile
}