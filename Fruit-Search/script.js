const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];


//Returns a list of fruit names that includes the input string
function search(str) {
	return fruit.filter(fruitName => fruitName.toLowerCase().includes(str.toLowerCase()));
}

//Displays the filtered list of fruit names
function searchHandler(e) {
	const inputVal = input.value;
	if (inputVal.length > 0) {          //only displaying list once user has entered a matching string input
		const results = search(inputVal);
		showSuggestions(results, inputVal);
	}
	else {
		suggestions.replaceChildren(); //removing li so that it does not remain displayed when input is empty
	}
}

//Creates a list of fruit names filtered from user input and appends them to the unordered list
function showSuggestions(results, inputVal) {
    const regex = new RegExp(inputVal, "gi"); 
	const inputSuggest = results.map(fruitName => `<li> ${fruitName.replace(regex, `<strong>$&</strong>`)}</li>`).join('');
	suggestions.innerHTML = inputSuggest;
}

//Replaces input to the fruit name that has been clicked on
function useSuggestion(e) {
	if (e.target.tagName === 'LI') {    //checking to see if the clicked on element is a li
		input.value = e.target.innerText;
		suggestions.innerHTML = '';    //removing the li values from the ul once a li element has been clicked on
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);