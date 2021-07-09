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
    token: 'fpkJeavtRBmyucTh87toGr:APA91bFOFJ4y7prDOWfo-SuvBW65BYQBzA09nRfctnVIm1mH_su5-68qVTvn-yvp0P4woF7ZwXnUqJKWCOuXjUR5FatGh7UDUnjObPDt_Bifp0INg6Rz9vPZvxTxGGRaCygS8t8uZJu8',
}

admin.messaging().send(message).then(res => {
    console.log(JSON.stringify(res));
}).catch(error => {
    console.log(JSON.stringify(error));
})