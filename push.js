var webPush = require("web-push");

const vapidKeys = {
    "publicKey":"BDqErZY-nFnDAH664VKwl_gsgfbWWRTc48y9QqbaMDeKnASMmCTC6hkrxK6L1LBcKQcNmth5Pw3SER2qufyiZlM","privateKey":"EZ_4Utxg3aQwE2bKlTUwh--nhz8yhVzKds-SAoNHMAs"
};

webPush.setVapidDetails(
    "mailto:agus050577@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eFRtkUGb3Is:APA91bEfSGClzCpWiXeGtuqef58aOJPCjVTh2aICKAW_-jojqqST5XxOrwkSYRfzi06DFbDRwoHigNQ00dhpZKx1I6dTnsqPFDNroPAkX3QD0wZ0cxN4L7_RwM3MVem1w1IkwglvW4gh",
    "keys": {
        "p256dh": "BCkb6sFAuug2CsnAjYyLq47szZ36+kDdQeMN2JKL14nz7QADitWdlNiqD7p3/TL3cvPksMzduxcqyiPIXN4bkv0=",
        "auth": "PSoAd71MEBExGSrEBxhiWQ=="
    }
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "91709064356",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);