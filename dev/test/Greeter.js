const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MockProvider } = require("ethereum-waffle");
const provider = new MockProvider();

describe("Greeter", function () {

  // Testing our greetings functions in our contract
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, class 19!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, class 19!");

    const setGreetingTx = await greeter.setGreeting("Hola, clase 19!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, clase 19!");
  });

  // Testing our deposit function in our contract
  it("Should return the new balance after deposit", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, class 19!");
    await greeter.deployed();

    await greeter.deposit({ value: 10 });
    
    expect(await provider.getBalance(greeter.address)).to.equal(110);
  });

});