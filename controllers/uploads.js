const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const loadFile = async (req, res) => {
  try {
    const nameFile = await uploadFile(req.files);
    // const nameFile = await uploadFile(req.files, ['txt', 'pdf'], 'texts');
    return res.status(200).json({ name_file: nameFile });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateFile = async (req, res) => {
  const { collection, id } = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) return res.status(404).json({ msg: "Usuario no encontrado" });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res.status(404).json({ msg: "Producto no encontrado" });
      break;

    default:
      return res.status(500).json({ msg: "Error del servidor" });
  }

  try {
    // lImpiar imagenes previas
    if (model.img) {
      //obtenemos el path de la imangen
      const pathImage = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );

      // Solo si existe la imagen la elimina
      fs.existsSync(pathImage) && fs.unlinkSync(pathImage);
    }

    const nameFile = await uploadFile(req.files, undefined, collection);
    model.img = nameFile;
    await model.save();
    return res.status(200).json(model);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const showImage = async (req, res) => {
  const { collection, id } = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) return res.status(404).json({ msg: "Usuario no encontrado" });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res.status(404).json({ msg: "Producto no encontrado" });
      break;

    default:
      return res.status(500).json({ msg: "Error del servidor" });
  }

  try {
    // lImpiar imagenes previas
    if (model.img) {
      //obtenemos el path de la imangen
      const pathImage = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );

      // Solo si existe la imagen la elimina
      if (fs.existsSync(pathImage)) return res.sendFile(pathImage);
    }

    const pathImage = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImage);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateFileCloudinary = async (req, res) => {
  const { collection, id } = req.params;
  let model, modelFolder;

  switch (collection) {
    case "users":
      modelFolder = 'users';
      model = await User.findById(id);
      if (!model) return res.status(404).json({ msg: "Usuario no encontrado" });
      break;

    case "products":
      modelFolder = 'products';
      model = await Product.findById(id);
      if (!model)
        return res.status(404).json({ msg: "Producto no encontrado" });
      break;

    default:
      return res.status(500).json({ msg: "Error del servidor" });
  }

  try {
    // lImpiar imagenes previas
    if (model.img) {
      const nameImageArray = model.img.split("/");
      const nameImage = nameImageArray[nameImageArray.length - 1];
      const [public_id] = nameImage.split(".");
      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const imgSaved = await cloudinary.uploader.upload(tempFilePath, {
      folder: `Coffe-shop/${modelFolder}`,
    });

    model.img = imgSaved.secure_url;
    await model.save();
    return res.status(200).json(model);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  loadFile,
  updateFile,
  showImage,
  updateFileCloudinary,
};
