import React, { useEffect, useState } from 'react';
import Block from './block';
import "./style.css"
import IndexAPI from '../../api/indexApi';

function Blockchain() {
    const [block, setBlock] = useState([]);

    useEffect(()=>{
        // if (localStorage.getItem("block")) {
        // const lcblock = JSON.parse(localStorage.getItem("block"));
        // setBlock(lcblock);
        // }
        const fetchAPI = async () => {
          const result = await IndexAPI.getBlock();
          let list_block = result.data.blocks;
          list_block[0].prev = 'none';
          for (let i = 1; i < list_block.length; i++) {
            list_block[i].prev = list_block[i-1].blockHash;
            
          }
          console.log(list_block)
          setBlock(list_block);
        }
        fetchAPI();
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
                      name={bl.blockNumber}
                      key={bl.blockNumber}
                      prevHash={bl.prev}
                      hash={bl.blockHash}
                      data={bl.rollResult}
                      time={bl.blockTimestamp}
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