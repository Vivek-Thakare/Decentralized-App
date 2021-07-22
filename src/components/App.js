import dBank from "../abis/dBank.json";
import React, { useState } from "react";
import Token from "../abis/Token.json";
import dbank from "../dbank.png";
import Web3 from "web3";
import "./App.css";
import { useEffect } from "react";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

//h0m3w0rk - add new tab to check accrued interest

const App = () => {
  const [web3, setWeb3] = useState("");
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [token, setToken] = useState();
  const [bank, setBank] = useState();
  const [dBankAddress, setdBankAddress] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [amt, setAmt] = useState(0);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    if (window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.requestAccounts();
      const bal = await web3.eth.getBalance(accounts[0]);

      setBalance(bal);
      setAccount(accounts[0]);
      setWeb3(web3);

      try {
        const toke = new web3.eth.Contract(
          Token.abi,
          Token.networks[netId].address
        );
        const myBank = new web3.eth.Contract(
          dBank.abi,
          dBank.networks[netId].address
        );

        setBank(myBank);
        setToken(toke);
        setdBankAddress(dBank.networks[netId].address);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("please install metamask");
    }
  };

  return (
    <div className="text-monospace">
      <nav className="navbar navbar-dark  bg-dark p-3 shadow">
        <a
          className="navbar-brand"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={dbank} className="App-logo" alt="logo" height="32" />
          <b>D-Bank</b>
        </a>
      </nav>
      <div className="container-fluid mt-5">
        <br></br>
        <h1 className="text-center">Welcome to dBank</h1>
        {loaded ? (
          <React.Fragment>
            <h3 className="text-center">{dBankAddress}</h3>
            <br></br>
            <div className="row mt-4">
              <div className="col-sm-5 mx-auto">
                <div className="card shadow rounded p-3 ">
                  <div className="container p-3">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#deposit"
                        >
                          Deposit
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#withdraw"
                        >
                          Withdraw
                        </a>
                      </li>
                    </ul>
                    <br />
                    <div className="tab-content">
                      <Deposit bank={bank} account={account} />
                      <Withdraw bank={bank} account={account} token={token} web3 = {web3}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <h2 className="text-center">Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default App;
