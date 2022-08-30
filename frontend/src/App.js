import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {

  const [deposit, setDeposit] = useState('');
  const [greetValue, setGreetValue] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [greeting, setGreeting] = useState('');

  //  -------------- Wallet connection variables --------------
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // This variable will contain our contract's address
  const contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Setting our contract's abi
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  // creatign our contract object
  const contract = new ethers.Contract(contractAddr, contractABI, signer);

  useEffect(() => {
    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []);
    }

    const getBalance = async () => {
      const balance = await provider.getBalance(contractAddr);
      const balanceFormat = ethers.utils.formatEther(balance);
      setCurrentBalance(balanceFormat);
    }

    // calling our contract's function to get the current greeting
    const getGreeting = async () => {
      const greeting = await contract.greet();
      console.log(greeting);
      setGreeting(greeting);
    }

    connectWallet().catch(console.error);
    getBalance().catch(console.error);
    getGreeting().catch(console.error);
  })
  // ----------------------------------------------------------

  // This function is going to set the new deposit value whenever the value in the field is changed
  const handleDepositChange = (e) => {
    setDeposit(e.target.value);
  }

  // This function is going to set a new greeting whenever the value in the field is changed
  const handleGreetingChange = (e) => {
    setGreetValue(e.target.value);
  }

  // This function is going to set a new deposit value
  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    // console.log(deposit);
    const depositedVal = ethers.utils.parseEther(deposit);
    const depositEth = await contract.deposit({ value: depositedVal });
    await depositEth.wait();
    const balance = await provider.getBalance(contractAddr);
    const balanceFormat = ethers.utils.formatEther(balance);
    setCurrentBalance(balanceFormat);
  }

  // This function is going to set a new greeting
  const handleGreetSubmit = async (e) => {
    e.preventDefault();
    const updatedGreeting = await contract.setGreeting(greetValue);
    await updatedGreeting.wait();
    setGreeting(greetValue);
    setGreetValue('');
  }

  return (
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          {/* <h3>Greetings Class 19</h3> */}
          <h3>{greeting}</h3>
          <p>This form will be used to fetch or change a greeting</p>
          <p>as well as fetch the current deposited balance ...</p>
          <p>Smart Contract's current balance is : {currentBalance} </p>
        </div>
        <div class="col">
          <form onSubmit={handleDepositSubmit}>
            <div class="mb-3">
              <label for="balance" class="form-label">Deposit ETH</label>
              <input type="number" class="form-control" id="balance" placeholder="0" onChange={handleDepositChange} value={deposit} />
            </div>
            <button type="submit" class="btn btn-primary">$ Deposit</button>
          </form>
          <br />
          <form onSubmit={handleGreetSubmit}>
            <div class="mb-3">
              <label for="greeting" class="form-label">Greeting message</label>
              <input type="text" class="form-control" id="greeting" placeholder="Greetings" onChange={handleGreetingChange} value={greetValue} />
            </div>
            <button type="submit" class="btn btn-success">Change greeting</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;