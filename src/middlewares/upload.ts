import multer, { StorageEngine } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

// ตรวจสอบและสร้างโฟลเดอร์ 'uploads' ถ้ายังไม่มี
const uploadFolder = 'uploads';
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder); 
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, uuidv4() + "." + file.mimetype.split("/")[1]); 
    }
});

const upload = multer({ storage });

export default upload