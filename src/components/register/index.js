
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import sha256 from "sha256";

const validateEmail = (input) => {
  const lengthValid = input.length > 2;
  const specialCharPattern = /^[a-zA-Z0-9]*$/;
  const noSpecialChars = specialCharPattern.test(input);
  return lengthValid && noSpecialChars;
};

const validatePassword = (input) => {
  const lengthValid = input.length > 5;
  return lengthValid;
};


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = validateEmail(email);
    const checkPassword = validatePassword(password);

    if (!check || !checkPassword){
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Username phải nhiều hơn 2 kí tự, không có kí tự đặc biệt và Password phải nhiều hơn 5 kí tự",
        showConfirmButton: false,
        timer: 2500,
      });
    } else if (password !== confirmPassword){
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Xác nhận mật khẩu không chính xác",
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      let wallet = JSON.parse(localStorage.getItem("my-wallet"));
      if(wallet){
        const findWallet = wallet.find((wl) => wl.name === email);
        if(findWallet){
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Tên tài khoản đã tồn tại",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const newWallet = {
            id: wallet.length,
            name: email,
            password: password,
            hashId:
              "0x" + sha256(email),
            coin: 100,
            transfer: 0,
            recieved: 0,
            mined: 0,
          };
          wallet.push(newWallet);
          const listWalletJSON = JSON.stringify(wallet);
          localStorage.setItem("my-wallet", listWalletJSON);
        }
      } else {
        wallet = [];
        const newWallet = {
          id: wallet.length,
          name: email,
          password: password,
          hashId:
            "0x" + sha256(email),
          coin: 100,
          transfer: 0,
          recieved: 0,
          mined: 0,
        };
        wallet.push(newWallet);
        const listWalletJSON = JSON.stringify(wallet);
        localStorage.setItem("my-wallet", listWalletJSON);
      }
      // redirect
      navigate("/login");

      // 
      Swal.fire({
        icon: "success",
        title: "Thông báo",
        text: "Đăng ký tài khoản thành công",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh'
      }}
    >
      <div className="card-content">
        <div className="title">
        <i className="fa-solid fa-dice"></i>
          DICE GAME
        </div>
        <div>
          <h3 className="mb-3">Đăng ký tài khoản</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-wallet mb-4"
            placeholder="Tên ví..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="name-wallet mb-4"
            placeholder="Mật khẩu ví..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="name-wallet mb-2"
            placeholder="Nhập lại mật khẩu..."
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            Tạo tài khoản
          </button>
        </form>
        <p style={{marginTop: '1.2em', fontSize: '12px'}}>Bạn đã có ví? <a href="/login">Đăng nhập</a></p>
      </div>
    </div>
  );
}

export default Register;

