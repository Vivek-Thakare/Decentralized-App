// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {  //inheriting ERC20 token
  address public minter; 

  event MinterChanged(address indexed from, address to);

  constructor() public payable ERC20("Decentralized Bank Currency", "DBC") {
    minter = msg.sender;
  }

  //Add pass minter role function

  function passMinterRole(address dBank) public returns(bool){
    require(msg.sender == minter, "Error, msg.sender does not have minting role");
    minter = dBank;
    emit MinterChanged(msg.sender, dBank);
    return true;
  }

  function mint(address account, uint256 amount) public {
    //check if msg.sender have minter role
    require(msg.sender == minter, "Error, msg.sender does not have minting role");
		_mint(account, amount);
	}
}