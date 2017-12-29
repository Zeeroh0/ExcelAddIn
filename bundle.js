/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/*
	 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	 * See LICENSE in the project root for license information.
	 */

	'use strict';

	(function () {

	  Office.initialize = function (reason) {
	    $(document).ready(function () {

	      if (!Office.context.requirements.isSetSupported('ExcelApi', 1.7)) {
	        console.log('Sorry. The tutorial add-in uses Excel.js APIs that are not available in your version of Office.');
	      }

	      $('#create-table').click(createTable);
	    });
	  };

	  function createTable() {
	    Excel.run(function (context) {

	      const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
	      const expensesTable = currentWorksheet.tables.add("A1:D1", true /*hasHeaders*/);
	      expensesTable.name = "ExpensesTable";

	      expensesTable.getHeaderRowRange().values = [["Date", "Merchant", "Category", "Amount"]];

	      var valuesToAdd1 = [["1/1/2017", "The Phone Company", "Communications", "120"]];

	      var valuesToAdd2 = [["1/2/2017", "Northwind Electric Cars", "Transportation", "142.33"]];

	      expensesTable.rows.add(null, valuesToAdd1);
	      expensesTable.rows.add(null, valuesToAdd2);

	      console.log("Expenses Table -> Rows", expensesTable.rows);
	      console.log("range to be formatted", expensesTable.columns.getItemAt(3).getRange());

	      expensesTable.columns.getItemAt(3).getRange().numberFormat = [['€#,##0.00']];
	      expensesTable.getRange().format.autofitColumns();
	      expensesTable.getRange().format.autofitRows();

	      return context.sync();
	    }).catch(function (error) {
	      console.log("Error: " + error);
	      if (error instanceof OfficeExtension.Error) {
	        console.log("Debug info: " + JSON.stringify(error.debugInfo));
	      }
	    });
	  }
	})();

/***/ }
/******/ ]);