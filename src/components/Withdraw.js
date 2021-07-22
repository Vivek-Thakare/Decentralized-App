import React, { useEffect, useState } from "react";

const Withdraw = (props) => {
  const { bank, account, token, web3 } = props;
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    const getTokenBalance = async() => setTokenBalance(await token.methods.balanceOf(account).call());
    getTokenBalance();
  },[]);

  const withdraw = async (e) => {
    e.preventDefault();
    try {
      await bank.methods.withdraw().send({ from: account });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="withdraw" className="container tab-pane fade">
      <h6>Do you want to withdraw ? </h6>
      <h6>Interest gained (DBC coins) : {web3.utils.fromWei(tokenBalance.toString())}</h6>
      <br></br>
      <button className="btn btn-success" onClick={withdraw}>
        Withdraw
      </button>
    </div>
  );
};

export default Withdraw;
