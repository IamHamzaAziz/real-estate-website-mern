import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

export const uploadPropertyPhotos = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "propertyPhotos", maxCount: 10 },
]);

export default upload;
