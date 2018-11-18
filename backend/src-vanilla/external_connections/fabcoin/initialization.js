"use strict";

var urlStrings = {
  errorFabNeverStarted: "Fabcoind was never started. "
};

var rpcCalls = {
  runFabcoind: {
    rpcCall: "runFabcoind", //<- must be the same as the command name, used for autocomplete purposes
    mandatoryFixedArguments: { //<- values give defaults, null for none
    },
    mandatoryModifiableArguments: { //<- values give defaults, null for none
      arguments: null
    },
    parameters: ["arguments"]
  },
  showLogFabcoind: {
    rpcCall: "showLogFabcoind",
    parameters: []
  },
  killAllFabcoind: {
    rpcCall: "killAllFabcoind",
    parameters: []
  },
  demoRegisterSmartContractAndABI: {
    rpc: "demoRegisterSmartContractAndABI",
    mandatoryModifiableArguments: {
      smartContractId: null,
      ABI: null,
    },
    parameters: ["smartContractId", "ABI"],
  },
  demoRegisterCorporation: {
    rpcCall: "demoRegisterCorporation",
    mandatoryModifiableArguments: {
      corporationNameHex: null
    },
    parameters: ["corporationNameHex"]
  },
  demoGetAllCorporations: {
    rpcCall: "demoGetAllCorporations",
    parameters: []
  }
}

module.exports = {
  rpcCalls,
  urlStrings
}