const multer = require('multer');
const FirebaseStorage = require('multer-firebase-storage')

const path = require('path');
const crypto = require("crypto");

const configs = require('./configs')


const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, file.key);
            });
        }
    }),
    FBS: FirebaseStorage({
        bucketName: configs.FIREBASE.bucketname,
        credentials: {
            clientEmail: configs.FIREBASE.client_email,
            privateKey: configs.FIREBASE.private_key,
            projectId: configs.FIREBASE.project_id,
        },
        directoryPath: 'teams',
        public: true,
        unique: true,

    })

};

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes['FBS'],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    },


};