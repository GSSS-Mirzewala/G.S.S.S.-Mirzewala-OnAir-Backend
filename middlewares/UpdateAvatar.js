// External Modules
import multer from "multer";

const update = multer({
  storage: multer.memoryStorage(), // Temp. in RAM
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default update;
