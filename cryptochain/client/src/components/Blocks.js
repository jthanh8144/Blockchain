import React, { useState, useEffect } from 'react';
import Block from './Block';

function Blocks() {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/blocks')
            .then((res) => res.json())
            .then((data) => setBlocks(data));
    }, []);

    return (
        <div>
            <h3>Blocks</h3>
            {blocks.map((block, index) => (
                <Block key={index} block={block} />
            ))}
        </div>
    );
}

export default Blocks;
