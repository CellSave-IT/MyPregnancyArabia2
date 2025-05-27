"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoUploader = exports.imageUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const basePath = req.baseUrl;
        const target = basePath.split('/').pop();
        const uploadPath = `./uploads/${target}`;
        return cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path_1.default.extname(file.originalname);
        const basePath = req.baseUrl;
        const target = basePath.split('/').pop();
        const uploadPath = `/uploads/${target}`;
        if (file?.fieldname === 'images[]') {
            req.body.images = req.body.images || [];
            req.body.images.push(`${uploadPath}/${fileName}`);
        }
        else if (file?.fieldname === 'image') {
            req.body.image = `${uploadPath}/${fileName}`;
        }
        else if (file.fieldname === 'banner') {
            req.body.banner = `${uploadPath}/${fileName}`;
        }
        cb(null, fileName);
    },
});
const checkImageType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp|avif|svg|mp4|pdf/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('Invalid image format');
    }
};
const checkVideoType = (file, cb) => {
    const filetypes = /mp4/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('Invalid video format');
    }
};
const imageUploader = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        checkImageType(file, cb);
    },
});
exports.imageUploader = imageUploader;
const videoUploader = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        checkVideoType(file, cb);
    },
});
exports.videoUploader = videoUploader;
//# sourceMappingURL=uploader.js.map