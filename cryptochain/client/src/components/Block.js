import React, { useState, useEffect } from 'react';

function Block({block}) {
    const { timestamp, hash, data } = block;
    const hashDisplay = `${hash.substring(0, 50)}...`;
    const stringifiedData = JSON.stringify(data);
    const dataDisplay =
        stringifiedData.length > 50
            ? `${stringifiedData.substring(0, 50)}...`
            : stringifiedData;

    return (
        <div className="block">
            <div>Hash: {hashDisplay}</div>
            <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
            <div>Data: {dataDisplay}</div>
        </div>
    );
}

export default Block;
