var admin = require("firebase-admin");
const configs = require('../../config/configs');

const Users = require('../../models/users/users');

const bucket = configs.FIREBASE.bucketname

const firebase = admin.initializeApp({
    credential: admin.credential.cert(configs.FIREBASE),
    storageBucket: bucket,
});




exports.deleteImg = async (file) => {

    const teste = await firebase.storage().bucket(bucket).file(file).delete();

    return file;
}