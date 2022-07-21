import React, { useState, useEffect } from 'react';

import Blocks from './Blocks';
import logo from '../assets/logo.png';

function App() {
    const [walletInfo, setWalletInfo] = useState({
        address: '',
        balance: 0,
    });

    useEffect(() => {
        fetch('http://localhost:3000/api/wallet-info')
            .then((res) => res.json())
            .then((data) => {
                setWalletInfo(data);
            });
    }, []);

    return (
        <div className='app'>
            <img className='logo' src={logo} />
            <h1>Cryptochain</h1>
            <div className='wallet-info'>
            <div>Address: {walletInfo.address}</div>
            <div>Balance: {walletInfo.balance}</div>
            </div>
            <Blocks />
        </div>
    );
}

export default App;
