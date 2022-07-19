const TransactionPool = require('./transaction');
const Transaction = require('./transaction');
const Wallet = require('./index');

// describe('TransactionPool', () => {
//     let transactionPool, transaction, senderWallet;

//     beforeEach(() => {
//         transactionPool = new TransactionPool();
//         senderWallet = new Wallet();
//         transaction = new Transaction({
//             amount: 50,
//             recipient: 'fake-recipient',
//             senderWallet,
//         });
//     });

//     describe('setTransaction()', () => {
//         it('adds a transaction', () => {
//             transactionPool.setTransaction(transaction);
//             expect(transactionPool.transactionMap[transaction.id]).toBe(
//                 transaction
//             );
//         });
//     });

//     describe('existingTransaction()', () => {
//         it('return an existing transaction given an input address', () => {
//             transactionPool.setTransaction(transaction);

//             exprect(
//                 transactionPool.existingTransaction({
//                     inputAddress: senderWallet.publicKey,
//                 })
//             ).toBe(transaction);
//         });
//     });

//     describe('validTransactions()', () => {
//         let validTransactions;

//         beforeEach(() => {
//             validTransactions = [];

//             for (let i = 0; i < 10; i++) {
//                 transaction = new Transaction({
//                     senderWallet,
//                     recipient: 'any-recipient',
//                     amount: 30,
//                 });
//             }

//             if (i % 3 === 0) {
//                 transaction.input.amount = 999999;
//             } else if (i % 3 === 1) {
//                 transaction.input.signature = new Wallet().sign('foo');
//             } else {
//                 validTransactions.push(transaction);
//             }

//             transactionPool.setTransaction(transaction);
//         });

//         it('returns valid transaction', () => {
//             expect(transactionPool.validTransactions()).toEqual(
//                 validTransactions
//             );
//         });
//     });

//     describe('clear()', () => {
//         it('clears the transactions', () => {
//             transactionPool.clear();

//             expect(transactionPool.transactionMap).toEqual({});
//         });
//     });
// });
