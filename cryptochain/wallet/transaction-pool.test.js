const TransactionPool = require('./transaction');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
    let transactionPool, transaction, senderWallet;

    beforeEach(() => {
        transactionPool = new TransactionPool();
        senderWallet = new Wallet()
        transaction = new Transaction({
            amount: 50,
            recipient: 'fake-recipient',
            senderWallet,
        });
    });

    // describe('setTransaction()', () => {
    //     it('adds a transaction', () => {
    //         transactionPool.setTransaction(transaction);
    //         expect(transactionPool.transactionMap[transaction.id]).toBe(
    //             transaction
    //         );
    //     });
    // });

    // describe('existingTransaction()', () => {
    //     it('return an existing transaction given an input address', () => {
    //         transactionPool.setTransaction(transaction);

    //         exprect(
    //             transactionPool.existingTransaction({
    //                 inputAddress: senderWallet.publicKey,
    //             })
    //         ).toBe(transaction);
    //     });
    // });
});
