"use strict";
const ids = require('../ids_dom_elements');
const fabcoinRPC = require('../../external_connections/fabcoin/rpc');
const pathnames = require('../../pathnames');
const globals = require('../globals');
const submitRequests = require('../submit_requests');
const jsonToHtml = require('../json_to_html');
const miscellaneousBackend = require('../../miscellaneous');
const solidity = require('../../solidity_abi').solidity;

function FabcoinNodeInitializer() {
  global.initializer = this;
  this.idOutput = ids.defaults.outputFabcoinInitialization;
  var inputInitialization = ids.defaults.fabcoin.inputInitialization;
  this.transformersStandard = {
    shortener: {
      transformer: miscellaneousBackend.hexShortenerForDisplay
    },
  };
  
  this.optionsDemo = {
    transformers: {
      abiPacking: this.transformersStandard.shortener,
      "generateOneBlock.result.${number}": this.transformersStandard.shortener,
      "input.corporationName": this.transformersStandard.shortener,
      "query.contractId": this.transformersStandard.shortener,
      "resultData.result.address": this.transformersStandard.shortener,
      "resultData.result.executionResult.newAddress": this.transformersStandard.shortener,
      "resultData.result.executionResult.output": this.transformersStandard.shortener,
      "resultData.result.transactionReceipt.stateRoot": this.transformersStandard.shortener,
      "resultData.result.transactionReceipt.bloom": this.transformersStandard.shortener,
    }
  };
  this.callTypes = {
    demo: {
      outputJSONDefault: ids.defaults.demo.outputDemo,
      outputOptionsDefault: this.optionsDemo
    }
  };  
  this.theFunctions = {
    runFabcoind: {
      inputs: {
        arguments: inputInitialization.fabcoindArguments
      },
      outputJSON: null,
    },
    demoRegisterCorporation: {
      inputs: {
        corporationNameHex: ids.defaults.demo.inputs.corporationNameHex
      },
      callType: this.callTypes.demo,
    },
    demoRegisterSmartContractAndABI: {
      inputs: {
        smartContractId: ids.defaults.kanbanGO.inputInitialization.contractId,
        ABI: ids.defaults.kanbanGO.inputInitialization.contractABI,
      },
      callType: this.callTypes.demo,
    },
    demoGetAllCorporations: {
      callType: this.callTypes.demo,
    }
  };
}

FabcoinNodeInitializer.prototype.callbackStandard = function(functionLabel, input, output) {
  window.kanban.fabcoin.rpc.fabNode.callbackStandard(functionLabel, input, output, this.optionsDemo);
}

FabcoinNodeInitializer.prototype.getArguments = function(functionLabel) {
  var theArguments = {};
  var functionFrontend = this.theFunctions[functionLabel];
  if (functionFrontend === null || functionFrontend === undefined) {
    return theArguments;
  }
  var currentInputs = functionFrontend.inputs;
  for (var inputLabel in currentInputs) {
    var inputId = currentInputs[inputLabel];
    theArguments[inputLabel] = document.getElementById(inputId).value;
  }
  var currentInputsBase64 = functionFrontend.inputsBase64;
  if (currentInputsBase64 !== null && currentInputsBase64 !== undefined) {
    for (var inputLabel in currentInputsBase64) {
      var theValue =  document.getElementById(currentInputsBase64[inputLabel]).value;
      theArguments[inputLabel] = Buffer.from(theValue).toString('base64');
    }
  }
  return theArguments;
}

FabcoinNodeInitializer.prototype.demoGetPossibleArgumentCalls = function (ABI, inputValues) {
  var possibleArgumentCalls = {};
  for (var i = 0; i < ABI.length; i ++) {
    var currentFunctionSpec = ABI[i];
    possibleArgumentCalls[currentFunctionSpec.name] = solidity.getABIPacking(currentFunctionSpec, inputValues);
    //console.log("DEBUG: current function spec: " + JSON.stringify(currentFunctionSpec));
  }
  return possibleArgumentCalls;
}

FabcoinNodeInitializer.prototype.demoPackArguments = function () {
  var inputsDemo = ids.defaults.demo.inputs;
  var result = { 
    possibleArgumentCalls: null,
    inputValues: {},
  };
  for (var label in inputsDemo) {
    var currentValue = document.getElementById(inputsDemo[label]).value;
    result.inputValues[label] = currentValue; 
  }
  var ABIcontent = document.getElementById(ids.defaults.kanbanGO.inputInitialization.contractABI).value;
  var ABI = JSON.parse(ABIcontent);
  result.possibleArgumentCalls = this.demoGetPossibleArgumentCalls(ABI, result.inputValues);
  var transformer = new jsonToHtml.JSONTransformer();
  transformer.writeJSONtoDOMComponent(result, ids.defaults.demo.outputDemo, this.optionsDemo);
}

FabcoinNodeInitializer.prototype.run = function(functionLabel, callbackOverridesStandard, manualInputs) {
  //console.log(`DEBUG: running ${functionLabel}. `);
  var theArguments = this.getArguments(functionLabel);
  if (manualInputs !== null && manualInputs !== undefined) {
    theArguments = Object.assign(theArguments, manualInputs);
  }
  var messageBody = fabcoinRPC.getPOSTBodyFromRPCLabel(functionLabel, theArguments);
  var theURL = `${pathnames.url.known.fabcoin.initialization}`;
  var currentResult = ids.defaults.fabcoin.outputFabcoinInitialization;
  var theFunction = null;
  var callType = null;
  if (functionLabel in this.theFunctions) {
    theFunction = this.theFunctions[functionLabel];
    if (theFunction.callType !== null && theFunction.callType !== undefined) {
      callType = theFunction.callType;
      if (typeof callType === "string") {
        callType = theFunction.callType[callType];
      }
    }
  }
  if (callType !== null && callType !== undefined) {
    if (callType.outputJSONDefault !== null && callType.outputJSONDefault !== undefined) {
      currentResult = callType.outputJSONDefault;
    }
  }
  if (theFunction !== null) {
    if (theFunction.outputJSON !== null && theFunction.outputJSON !== undefined) {
      currentResult = theFunction.outputJSON;
    }
  }

  var currentProgress = globals.spanProgress();
  var callbackCurrent = this.callbackStandard;
  var functionFrontend = this.theFunctions[functionLabel];
  if (functionFrontend !== undefined) {
    if (functionFrontend.callback !== undefined && functionFrontend.callback !== null) {
      callbackCurrent = functionFrontend.callback;
    }  
  }
  if (callbackOverridesStandard !== null && callbackOverridesStandard !== undefined) {
    callbackCurrent = callbackOverridesStandard;
  } else {
    callbackCurrent = callbackCurrent.bind(this, functionLabel);
  }
  theURL += `?command=${messageBody}`;
  submitRequests.submitGET({
    url: theURL,
    progress: currentProgress,
    callback: callbackCurrent,
    result: currentResult
  });
}

var initializer = new FabcoinNodeInitializer();

module.exports = {
  initializer
}