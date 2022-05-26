// SPDX-License-Identifier: MIT 
pragma solidity >= 0.4.22 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rent.sol";

contract TestRent {
  // The address of the adoption contract to be tested
  Rent rent = Rent(DeployedAddresses.Rent());

  // The id of the pet that will be used for testing
  uint expectedCarId = 8;

  // The expected owner of adopted pet is this contract
  address expectedClients = address(this);

  // Testing the adopt() function
function testClientRentCard() public {
  uint returnedId = rent.rentals(expectedCarId);

  Assert.equal(returnedId, expectedCarId, "The rental of the expected vehicle must match what is returned.");
}

// Testing retrieval of a single pet's owner
function testGetClientsAddressByCarId() public {
  address client = rent.clients(expectedCarId);

  Assert.equal(client, expectedClients, "Owner of the expected pet should be this contract");
}

// Testing retrieval of all pet owners
function testGetClientAddressByCarIdInArray() public {
  // Store adopters in memory rather than contract's storage
  address[16] memory clients = rent.getrentals();

  Assert.equal(clients[expectedCarId], expectedClients, "Owner of the expected pet should be this contract");
}

}