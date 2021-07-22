import React, { useState } from "react";

const Deposit = (props) => {
  const [amt, setAmt] = useState(0);

  const {bank, account} = props;

  const deposit = async (e) => {
    try {
      e.preventDefault();
      let finalAmt = amt * 10 ** 18; //converting to wei
      console.log(finalAmt, account);
      await bank.methods
        .deposit()
        .send({ value: finalAmt.toString(), from: account });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form id="deposit" className="container tab-pane active" onSubmit={deposit}>
      <div className="form-group">
          <label htmlFor="depo">Enter Amount of ETH to Deposited. (minimum 0.01 ETH)</label>
        <input
        id="depo"
          onChange={(e) => {
            setAmt(e.target.value);
          }}
          type="number"
          className="form-control"
          step="0.01"
          required
        ></input>
        <br></br>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Deposit;
