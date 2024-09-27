// ==UserScript==
// @name AODocs KB Search Enter
// @description Fix <Enter> key in AODocs Knowledge Base search field autocompletion
// @version 0.0.1
// @namespace com.teddywing
// @match https://support.aodocs.com/*
// ==/UserScript==

var SCRIPT_NAME = 'AODocs KB Search Enter';

var search_input = document.getElementById('query');

search_input.addEventListener(
	'keydown',
	function(event) {
		if (
			event.key !== 'Enter'
			|| (event.altKey && event.key === 'Enter')
		) {
			return;
		}

		event.stopPropagation();
		event.stopImmediatePropagation();
		event.preventDefault();

		go_to_highlighted_article();
	}
);

function go_to_highlighted_article () {
	var algolia_autocomplete_dropdown = document.querySelector(
		'.algolia-autocomplete .aa-dataset-articles'
	);

	var highlighted_autocompletion = algolia_autocomplete_dropdown.querySelector(
		'.aa-suggestion[aria-selected="true"]'
	);

	console.info(SCRIPT_NAME, 'Selected completion', highlighted_autocompletion);

	highlighted_autocompletion.click();
}
