import multer, { StorageEngine } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';


const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, `${uuidv4()}${extension}`); 
    }
});

const upload = multer({ storage });

export default upload;