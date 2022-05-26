App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../cars.json', function(data) {
      var carsRow = $('#carsRow');
      var carTemplate = $('#carTemplate');

      for (i = 0; i < data.length; i ++) {
        carTemplate.find('.panel-title').text(data[i].name);
        carTemplate.find('img').attr('src', data[i].picture);
        carTemplate.find('.car-type').text(data[i].type);
        carTemplate.find('.car-age').text(data[i].age);
        carTemplate.find('.car-location').text(data[i].location);
        carTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        carsRow.append(carTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });;
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('rebt.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var RentArtifact = data;
      App.contracts.Rent = TruffleContract(RentArtifact);
    
      // Set the provider for our contract
      App.contracts.Rent.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markRented();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleRent);
  },

  markRented: function() {
    var RentInstance;

App.contracts.Rent.deployed().then(function(instance) {
  RentInstance = instance;

  return RentInstance.getrentals.call();
}).then(function(clients) {
  for (i = 0; i < clients.length; i++) {
    if (clients[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});

  },

  handleRent: function(event) {
    event.preventDefault();

    var carId = parseInt($(event.target).data('id'));

    var rentInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Rent.deployed().then(function(instance) {
    rentInstance = instance;

    // Execute adopt as a transaction by sending account
    return rentInstance.rent(carId, {from: account});
  }).then(function(result) {
    return App.markRented();
  }).catch(function(err) {
    console.log(err.message);
  });
});

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
