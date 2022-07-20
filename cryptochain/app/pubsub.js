// const redis = require('redis');

require('dotenv').config();
const PubNub = require('pubnub');

const credentials = {
    publishKey: process.env.PUBSUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBSUB_SUBSCRIBE_KEY,
    secretKey: process.env.PUBSUB_SECRET_KEY,
    uuid: 'jthanh8144',
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION',
};

class PubSub {
    constructor({ blockchain, transactionPool }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;

        // this.publisher = redis.createClient();
        // this.subscriber = redis.createClient();

        // this.subscribeToChannels();

        // this.subscriber.on('message', (channel, message) =>
        //     this.handleMessage(channel, message)
        // );

        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
        this.pubnub.addListener(this.listener());
    }

    listener() {
        return {
            message: (messageObject) => {
                const { channel, message } = messageObject;
                console.log(`Channel ${channel}, message: ${message}`);
                const parsedMessage = JSON.parse(message);
                switch (channel) {
                    case CHANNELS.BLOCKCHAIN:
                        this.blockchain.replaceChain(parsedMessage, true, () => {
                            this.transactionPool.clearBlockchainTransactions({
                                chain: parsedMessage,
                            });
                        });
                        break;
                    case CHANNELS.TRANSACTION:
                        this.transactionPool.setTransaction(parsedMessage);
                        break;
                    default:
                        break;
                }
            },
        };
    }

    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    }

    // handleMessage(channel, message) {
    //     console.log(`Channel ${channel}, message: ${message}`);
    //     const parsedMessage = JSON.parse(message);
    //     if (channel === CHANNELS.BLOCKCHAIN) {
    //         this.blockchain.replaceChain(parsedMessage);
    //     }
    // }

    // subscribeToChannels() {
    //     Object.values(CHANNELS).forEach((channel) => {
    //         this.subscriber.subscribe(channel);
    //     });
    // }

    // publish({ channel, message }) {
    //     this.subscriber.unsubscribe(channel, () => {
    //         this.publisher.publish(channel, message, () => {
    //             this.subscriber.subscribe(channel);
    //         });
    //     });
    // }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain),
        });
    }

    broadcastTransaction(transaction) {
        this.publish({
            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(transaction),
        });
    }
}

module.exports = PubSub;
