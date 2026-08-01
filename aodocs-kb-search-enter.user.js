// ==UserScript==
// @name AODocs KB Search Enter
// @description Fix <Enter> key in AODocs Knowledge Base search field autocompletion
// @version 0.0.2
// @namespace com.teddywing
// @match https://support.aodocs.com/*
// ==/UserScript==

// Copyright (c) 2024, 2026  Teddy Wing
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

var SCRIPT_NAME = 'AODocs KB Search Enter';

var search_input = document.getElementById('query');

search_input.addEventListener(
	'keydown',
	function(event) {
		if (
			event.key !== 'Enter'

			// Option-Enter triggers non-Algolia backend search.
			|| (event.altKey && event.key === 'Enter')
		) {
			return;
		}

		// Continue to search results if no autocompletion is selected.
		if (!is_autocompletion_highlighted()) {
			return;
		}

		event.stopPropagation();
		event.stopImmediatePropagation();
		event.preventDefault();

		go_to_highlighted_article();
	}
);

function is_autocompletion_highlighted () {
	return get_highlighted_autocompletion() !== null;
}

function get_highlighted_autocompletion () {
	var algolia_autocomplete_dropdown = document.querySelector(
		'.algolia-autocomplete .aa-dataset-articles'
	);

	var highlighted_autocompletion = algolia_autocomplete_dropdown.querySelector(
		'.aa-suggestion[aria-selected="true"]'
	);

	return highlighted_autocompletion;
}

function go_to_highlighted_article () {
	highlighted_autocompletion = get_highlighted_autocompletion();

	console.info(SCRIPT_NAME, 'Selected completion', highlighted_autocompletion);

	highlighted_autocompletion.click();
}
