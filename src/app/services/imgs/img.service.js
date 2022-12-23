var admin = require("firebase-admin");
const configs =  require('../../config/configs');
const bucket = configs.FIREBASE.bucketname

const firebase = admin.initializeApp({
    credential: admin.credential.cert(configs.FIREBASE),
    storageBucket: bucket,
});




exports.deleteImg = async (file) => {


    const teste = await firebase.storage().bucket(bucket).file(file).delete();

    // const bucket = firebase.storage().bucket();
    // console.log(teste);
    return file;
}