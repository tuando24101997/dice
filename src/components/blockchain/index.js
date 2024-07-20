import React, { useEffect, useState } from 'react';
import Block from './block';
import "./style.css"

function Blockchain() {
    const [block, setBlock] = useState([]);

    useEffect(()=>{
        if (localStorage.getItem("block")) {
        const lcblock = JSON.parse(localStorage.getItem("block"));
        setBlock(lcblock);
        }
    }, [])
    return (
        <div>
          <div className="header shadow-sm mb-4">
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>BLOCKCHAIN DICE GAME</p>
            <div>
              <a href="/transaction">View Transaction</a>
              <a href="/">Play Game</a>
            </div>
          </div>
    
          <div className="container cont">
            <div className="row">
              <div className="col-2">
                
              </div>
    
              <div className="col-8">
                <div className="list-blockchain">
                  {block.map((bl) => (
                    <Block
                      name={bl.name}
                      key={bl.id}
                      prevHash={bl.prevHash}
                      hash={bl.hash}
                      data={bl.data}
                    />
                  ))}
                </div>
              </div>

              <div className="col-2">
                
              </div>
            </div>
          </div>
        </div>
      );
}

export default Blockchain