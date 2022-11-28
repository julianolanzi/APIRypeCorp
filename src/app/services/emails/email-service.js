const config = require('../../config/configs');
const dotenv = require('dotenv');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.registerMessage = (user) => {
    return {
        to: user.email,
        from: {
            name: 'RypeGG',
            email: 'contato@rypegg.com'
        },
        templateId: config.registerEmailId,
        dynamicTemplateData: {
            nickname: user.nickname,
            name: user.name,
            // phone: user.phone[0].cell,
            email: user.email

        }
    };
}

exports.forgotPassword = (user, url) => {
    return {
        to: user.email,
        from: {
            name: 'RypeGG',
            email: 'contato@rypegg.com'
        },
        templateId: config.resertPassword,
        dynamicTemplateData: {
            name: user.name,
            url: url

        }
    };
}

exports.sendEmail = async (message) => {
    try {
        const response = sendgrid.send(message);
        console.log(response);
        console.log('Email successfully sent');
    } catch (error) {
        console.error(error)
    }
}
