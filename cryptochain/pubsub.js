require('dotenv').config();
const redis = require('redis');
const PubNub = require('pubnub');

const credentials = {
    publishKey: process.env.PUBSUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBSUB_SUBSCRIBE_KEY,
    secretKey: process.env.PUBSUB_SECRET_KEY,
    uuid: 'jthanh8144',
};

const CHANNELS = {
    TEST: 'TEST',
};

class PubSub {
    constructor() {
        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
        this.pubnub.addListener(this.listener());
    }

    listener() {
        return {
            message: (messageObject) => {
                const { channel, message } = messageObject;
                console.log(`Channel ${channel}, message: ${message}`);
            },
        };
    }

    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    }
}

const test = new PubSub();
test.publish({ channel: CHANNELS.TEST, message: 'hello' });

module.exports = PubSub;
