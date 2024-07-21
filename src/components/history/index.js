import React, { useEffect, useState } from "react";
import "./style.css";

function History() {
  const [listTransaction, setListTransacTion] = useState([]);

  useEffect(() => {
    const listHistory = JSON.parse(localStorage.getItem("transaction-history"));
    console.log(listHistory);
    setListTransacTion(listHistory);
  }, []);
  return (
    <div>
      <div className="header-transaction shadow-sm mb-4">
        <p style={{ fontSize: "20px", fontWeight: "500" }}>
          Transaction History
        </p>
        <div>
        <a href="/blockchain" style={{marginRight: '6px'}}>
          <span>Blockchain</span>
        </a>
        <a href="/">
          <span>Play Game</span>
        </a>
        </div>
        
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>ID Roll</th>
              <th>Result</th>
              <th>Method</th>
              <th>From</th>
              <th></th>
              <th>To</th>
              <th>Coin</th>
              <th>Fees Gas</th>
            </tr>
            {listTransaction.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>
                    {transaction.id}
                  </td>
                  <td>{transaction.block}</td>
                  <td>
                    <span className="txtBlock">Transfer</span>
                  </td>

                  <td className="txtWalletTransaction">{transaction.from}</td>
                  <td className="txtCenter">
                    <i className="fa-solid fa-arrow-right txtArrow"></i>
                  </td>
                  <td className="txtWalletTransaction">{transaction.to}</td>
                  <td>{transaction.value}</td>
                  <td>{transaction.gas}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
