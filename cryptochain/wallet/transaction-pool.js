const Transaction = require('./transaction');

class TransactionPool {
    constructor() {
        this.transactionMap = {};
    }

    setTransaction(transaction) {
        this.transactionMap[transaction.id] = transaction;
    }

    setMap(transactionMap) {
        this.transactionMap = transactionMap;
    }

    existingTransaction({ inputAddress }) {
        const transactions = Object.values(this.transactionMap);
        console.log(transactions.find(
            (transaction) => transaction.input.address === inputAddress
        ));
        return transactions.find(
            (transaction) => transaction.input.address === inputAddress
        );
    }

    validTransactions() {
        return Object.values(this.transactionMap).filter((trans) =>
            Transaction.validTransaction(trans)
        );
    }

    clear() {
        this.transactionMap = {};
    }

    clearBlockchainTransaction({ chain }) {
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            for (let transaction of block.data) {
                if (this.transactionMap[transaction.id]) {
                    delete this.transactionMap[transaction.id];
                }
            }
        }
    }
}

module.exports = TransactionPool;
