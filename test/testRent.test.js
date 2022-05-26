const Rent = artifacts.require("Rent");

contract("Rent", (accounts) => {
  let Rent;
  let expectedClient;

  before(async () => {
      rent = await Rent.deployed();
  });

  describe("rent car and retrieving account addresses", async () => {
    before("rent car using accounts[0]", async () => {
      await rent.rentals(8, { from: accounts[0] });
      expectedClient = accounts[0];
    });

  });

  describe("rent car and retrieving account addresses", async () => {
    before("rent car using accounts[0]", async () => {
      await rent.rentals(8, { from: accounts[0] });
      expectedClient = accounts[0];
    });
  
    it("can fetch the address of an client by car id", async () => {
      const client = await rent.clients(8);
      assert.equal(client, expectedClient, "The client of the rent car should be the first account.");
    });
  });

  it("can fetch the collection of all rent clients' addresses", async () => {
    const clients = await rent.getrentals();
    assert.equal(clients[8], expectedClient, "The client of the rent car should be in the collection.");
  });
});
