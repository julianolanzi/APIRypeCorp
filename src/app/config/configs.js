const dotenv = require('dotenv');

module.exports = {
    DATABASE: process.env.DATABASE,
    SECRET: process.env.SECRET,

    containerConnectionString: 'TBD',
    SALT_KEY: 'f5b99242-6504-4ca3-90f2-05e78e5761ef',
    TEMPLATE_ID: 'd-d091cde78aca4507bd31aaad3cf77efd',
    APP: 'http://localhost:3000',
    registerEmailId: 'd-8871a7a9e7184ab1b3538c24f4fa1d0d',
    resertPassword: 'd-4a0d0004a7b749568f3be0368462aefc',
    application: 'http://localhost:3000',

    SENDGRID:{
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    },

    FIREBASE: {
        bucketname: process.env.BUCKENAME,
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    },
}