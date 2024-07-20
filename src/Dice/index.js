// src/App.js
import React, { useEffect, useState } from "react";
import "./style.css";
import Dice from "../img/dice-game.gif";
import DiceRoll_1 from "../img/Dice-1.png";
import DiceRoll_2 from "../img/Dice-2.png";
import DiceRoll_3 from "../img/Dice-3.png";
import DiceRoll_4 from "../img/Dice-4.png";
import DiceRoll_5 from "../img/Dice-5.png";
import DiceRoll_6 from "../img/Dice-6.png";
import icon from "../img/icon.png";
import icon_roll from "../img/icon-roll.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import sha256 from "sha256";

function DiceGame() {
  const navigate = useNavigate();

  // State
  const [choose, setChoose] = useState(0);
  const [coin, setCoin] = useState(0);
  const [start, setStart] = useState(false);
  const [random, setRandom] = useState(1);
  const [wallet, setWallet] = useState({});
  const [listWallet, setListWallet] = useState([]);
  const [block, setBlock] = useState([
    {
      id: 0,
      data: "First block",
      prevHash: "none",
      hash: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
      name: "GENESIS BLOCK",
    },
  ]);
  const [gas, setGas] = useState(0);
  const [idRoll, setIdRoll] = useState(45352);
  const [ready, setReady] = useState(true);
  const [result, setResult] = useState(0);

  // List url
  const diceImages = {
    1: DiceRoll_1,
    2: DiceRoll_2,
    3: DiceRoll_3,
    4: DiceRoll_4,
    5: DiceRoll_5,
    6: DiceRoll_6,
  };

  const handleChooseClick = (value) => {
    if (value === choose) {
      setChoose(0);
    } else {
      setChoose(value);
    }
  };

  useEffect(() => {
    // console.log(random);
    let isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (!isLogin) {
      navigate("/login");
    }
    const lc_block = localStorage.getItem("block");
    if(lc_block === "null"){
      localStorage.setItem("block", JSON.stringify(block));
    } else {
      const list_block = JSON.parse(lc_block);
      setBlock(list_block);
    }
    
    const list_wallet = JSON.parse(localStorage.getItem("my-wallet"));
    setListWallet(list_wallet);
    const user = list_wallet.find(
      (wallet) =>
        wallet.name === JSON.parse(localStorage.getItem("email-my-coin"))
    );
    setWallet(user);
    const lcRoll = localStorage.getItem("Id_roll");
    if (lcRoll !== null) {
      const id_roll = JSON.parse(lcRoll);
      setIdRoll(id_roll);
    } else {
      localStorage.setItem("Id_roll", JSON.stringify(idRoll));
    }
  }, [random]);

  const handlePlayGame = (e) => {
    e.preventDefault();

    // validate input roll
    if (choose === 0) {
      Swal.fire({
        title: "Lỗi",
        text: "Bạn chưa chọn Tài/Xỉu",
        icon: "error",
      });
    } else {
      if (isNaN(coin) || coin <= 0 || coin === "" || coin > wallet.coin) {
        Swal.fire({
          title: "Lỗi",
          text: "Coin không phù hợp",
          icon: "error",
        });
      } else {
        if (!ready) {
          setReady(true);
          setChoose(0);
          setResult(0);
        } else {
          const roll = Math.floor(Math.random() * 6) + 1;
          setRandom(roll);
          setStart(true);
          setReady(false);
          setTimeout(() => {
            setStart(false);
            const roll = Math.floor(Math.random() * 6) + 1;
            setRandom(roll);
            const newId = idRoll + 1;
            setIdRoll(newId);
            setResult(roll);
            localStorage.setItem("Id_roll", JSON.stringify(newId));
            // add block in blockchain
            const newBlock = {
              id: block.length,
              data: "Result roll #" + idRoll + ": " + roll,
              prevHash: block[block.length - 1].hash,
              hash: sha256("BLOCK #" + block.length),
              name: "BLOCK #" + block.length,
            };
            let currentBlock = block;
            currentBlock.push(newBlock);
            setBlock(currentBlock);
            const listBlockJSON = JSON.stringify(currentBlock);
            localStorage.setItem("block", listBlockJSON);

            let check = 2; // Tài
            if (roll < 4) {
              check = 1; // Xỉu
            }
            if (check === choose) {
              Swal.fire("Bạn thua!");
              wallet.coin = Number(wallet.coin) - Number(coin) - Number(gas);
              setWallet(wallet);
              listWallet[wallet.id].coin = wallet.coin;
              localStorage.setItem("my-wallet", JSON.stringify(listWallet));
              const transaction = {
                id: Math.floor(Date.now() / 1000),
                transactionId: sha256(block.length),
                from: wallet.hashId,
                to: "Nhà cái (0xe7c3b1ab0d1e75dabc1cf3157e9b6d786a69b0d18716a64597d8ecf0e92939a4)",
                block: block.length,
                value: coin,
                gas: gas,
              };
              let listHistory = JSON.parse(
                localStorage.getItem("transaction-history")
              );
              if (listHistory) {
                listHistory.push(transaction);
                const listTransactionJSON = JSON.stringify(listHistory);
                localStorage.setItem(
                  "transaction-history",
                  listTransactionJSON
                );
              } else {
                let listTransaction = [];
                listTransaction.push(transaction);
                const listTransactionJSON = JSON.stringify(listTransaction);
                localStorage.setItem(
                  "transaction-history",
                  listTransactionJSON
                );
              }
            } else {
              Swal.fire("Bạn thắng!");
              wallet.coin = Number(wallet.coin) + Number(coin) - Number(gas);
              setWallet(wallet);
              listWallet[wallet.id].coin = wallet.coin;
              localStorage.setItem("my-wallet", JSON.stringify(listWallet));
              const transaction = {
                id: Math.floor(Date.now() / 1000),
                transactionId: sha256(block.length),
                from: "Nhà cái (0xe7c3b1ab0d1e75dabc1cf3157e9b6d786a69b0d18716a64597d8ecf0e92939a4)",
                to: wallet.hashId,
                block: block.length,
                value: coin,
                gas: gas,
              };
              let listHistory = JSON.parse(
                localStorage.getItem("transaction-history")
              );
              if (listHistory) {
                listHistory.push(transaction);
                const listTransactionJSON = JSON.stringify(listHistory);
                localStorage.setItem(
                  "transaction-history",
                  listTransactionJSON
                );
              } else {
                let listTransaction = [];
                listTransaction.push(transaction);
                const listTransactionJSON = JSON.stringify(listTransaction);
                localStorage.setItem(
                  "transaction-history",
                  listTransactionJSON
                );
              }
            }
          }, 5000);
        }
      }
    }
  };

  const handleExit = () => {
    navigate('/login');
    localStorage.setItem("isLogin", JSON.stringify(false));

  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="header-game">
        <span>
          {" "}
          <img src={icon} alt="Icon" />
          DICE GAME
        </span>
        <div>
          <a href="/blockchain" className="btn-game">Blockchain</a>
          <a href="/transaction" className="btn-game">Transaction</a>
          <button onClick={handleExit} className="btn btn-primary" style={{padding: '4px 10px', fontSize: '13px', marginRight: '1em'}}>Thoát</button>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-5 card-choose shadow-lg">
            <p style={{ margin: "0", padding: "0", fontWeight: "500" }}>
              <span className="txtWallet2">{wallet.hashId}</span>
            </p>
            <p style={{ margin: "0", padding: "0" }}>
              {" "}
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                Balance {wallet.coin}
              </span>
            </p>
            <p style={{ margin: "0", padding: "0" }}>
              {" "}
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                ID ROLL: {idRoll}
              </span>
            </p>
            <div style={{ marginTop: "3em" }}>
              <button
                className={choose === 1 ? "btn-choose active" : "btn-choose"}
                onClick={() => handleChooseClick(1)}
              >
                Tài
              </button>
              <button
                className={choose === 2 ? "btn-choose active" : "btn-choose"}
                onClick={() => handleChooseClick(2)}
              >
                Xỉu
              </button>
            </div>
            <div>
              <form onSubmit={handlePlayGame}>
                <label className="txtLabel">Your stake</label>
                <input
                  value={coin}
                  className="inp-coin"
                  onChange={(e) => {
                    setCoin(e.target.value);
                    setGas(e.target.value * 0.0125);
                  }}
                  type="text"
                />
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    fontStyle: "italic",
                  }}
                >
                  Fees Gas: {gas}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: '500'
                  }}
                >
                  Result: {result}
                  {(result <= 3 && result >= 1) && <span> (Xỉu)</span>}
                  {(result <= 6 && result >= 4) && <span> (Tài)</span>}
                </p>
                <br />
                {ready ? (
                  <button type="submit" className="btnSubmit">
                    PLAY
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btnSubmit"
                  >
                    READY
                  </button>
                )}
              </form>
            </div>
          </div>
          <div className="col-2">
            <div className="App">
              <div style={{ textAlign: "center" }}>
                <div className="cont-coin">
                  <img
                    style={{ height: "100px", width: "100px" }}
                    src={icon_roll}
                    alt="Icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-5 shadow-lg">
            <div className="App">
              <div style={{ textAlign: "center" }}>
                <div className="cont-coin">
                  {start ? (
                    <img
                      src={Dice}
                      style={{ width: "300px", height: "300px" }}
                      alt="roll"
                    />
                  ) : (
                    <img
                      src={diceImages[random]}
                      style={{ width: "230px", height: "230px" }}
                      alt="no roll"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiceGame;
