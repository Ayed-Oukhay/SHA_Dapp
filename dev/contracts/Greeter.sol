// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying greeter contract: ", _greeting);
        greeting = _greeting;
    }

    // A function called Greet that returns a greeting
    function greet() public view returns (string memory) {
        return greeting;
    }

    // A function called SetGreeting that allows you to change that greeting
    function setGreeting(string memory _greeting) public {
        console.log("Setting greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    // We'll be creating another function called Deposit that allows you to deposit ether into our contract
    function deposit() public payable {}
}
