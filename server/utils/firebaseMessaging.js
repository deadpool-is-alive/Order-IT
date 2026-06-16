const { getMessaging } = require("firebase-admin/messaging");

const app = require("../firebase/firebase");

async function sendPushNotification(token, title, body){
    try{
        const message = {
            token, 
            data: {
                title,
                body
            }
        };

        const response = await getMessaging(app).send(message);

        console.log("Push Sent:", response);

    } catch(err){
        console.error("Push error: " , err);
        throw err;
    }
}

module.exports = sendPushNotification;