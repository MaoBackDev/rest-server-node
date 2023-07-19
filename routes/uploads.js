const {Router} = require('express');
const { loadFile, showImage, updateFileCloudinary } = require('../controllers/uploads');
const { fileValidator, validateFile } = require('../middlewares');


const router = Router();

router.post('/', validateFile, loadFile);
router.put('/:collection/:id', [validateFile, fileValidator], updateFileCloudinary);
// router.put('/:collection/:id', [validateFile, fileValidator], updateFile);
router.get('/:collection/:id', [fileValidator], showImage);

module.exports = router;