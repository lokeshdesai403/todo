var admin = require("firebase-admin");

var serviceAccount = require('./makemylist-958a6-firebase-adminsdk-qe0ym-16ca27de19.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const message = {
    notification: {
        title: 'Make My List - TASK',
        body: 'PERSONAL::: Proident enim fugiat ex cupidatat eiusmod duis culpa.',
    },
    token: 'cFHewynKR86enGMHT_KYV2:APA91bFagRBvQyMjrh2VdBpwENnQ_ol7fjN2kJMxXjbkJ6C1efr4NiRX9lpHDEJsT-5eXC-ZSWYMBlyA54K8p0QV8YmsBrPaj-WYnaPIsfJSxYPfC3EWgzZ2EiaC1mWBuroLR8I2fbQC',
}

admin.messaging().send(message).then(res => {
    console.log(JSON.stringify(res));
}).catch(error => {
    console.log(JSON.stringify(error));
})