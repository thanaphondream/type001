import multer from 'multer';

const storage = multer.memoryStorage(); // ใช้ memoryStorage แทน diskStorage

const upload = multer({ storage });

export default upload;