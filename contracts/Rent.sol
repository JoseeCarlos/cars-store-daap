// SPDX-License-Identifier: MIT 
pragma solidity >= 0.4.22 <0.8.0;

contract Rent {
    address[16] public clients;

    function rentals(uint carId) public returns (uint) {
    require(carId >= 0 && carId <= 15);

        clients[carId] = msg.sender;

    return carId;
    }

    function getrentals() public view returns (address[16] memory) {
        return clients;
    }
}

// Adopting a pet





// Retrieving the adopters
