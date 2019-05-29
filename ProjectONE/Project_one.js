document.getElementById('reset').addEventListener('click', function (event) {
    clearInput();
})
var allCards = [];
document.getElementById('add').addEventListener('click', function (event) {

    var oneCard = {
        card_creator: document.getElementById('creator').value,
        card_date: document.getElementById('date').value,
        card_text: document.getElementById('text').value
    };

    allCards.push(oneCard);
    clearInput();
    setToLocalStorage(allCards);
    createCard(oneCard, allCards);

})

function clearInput() {
    document.getElementById('text').value = ' ';
    document.getElementById('date').value = ' ';
    document.getElementById('creator').value = ' ';
}

function setToLocalStorage(arr) {
    window.localStorage.setItem('Cards_inara', JSON.stringify(arr));
}

function getFromStorage() {
    var savedCards = JSON.parse(window.localStorage.getItem('Cards_inara'));
    if (savedCards != null) {
        for (var j = 0; j < savedCards.length; j++) {
            createCard(savedCards[j], savedCards);
            allCards.push(savedCards[j]);
        }
    }
}

var row = document.getElementById('row_for_card');

function createCard(obj) {
    var divCol = document.createElement('div');
    divCol.classList.add('col-md-3');
    var divCard = document.createElement('div');
    divCard.classList.add('card');
    var cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    var dispose = document.createElement('span');
    cardHeader.appendChild(dispose);
    dispose.classList.add('dispose', 'glyphicon', 'glyphicon-floppy-remove');
    dispose.addEventListener('click', function (event) {
        this.parentElement.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement);
        var index = allCards.indexOf(obj);
        allCards.splice(index, 1);
        setToLocalStorage(allCards);
    })

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    var cardTitle = document.createElement('h6');
    cardTitle.classList.add('card-title');
    var cardText = document.createElement('p');
    cardText.classList.add('card-text');

    var cardHeaderTxt = document.createTextNode(obj.card_creator);
    var cardTitleTxt = document.createTextNode(obj.card_date);
    var cardTextTxt = document.createTextNode(obj.card_text);

    row.appendChild(divCol).appendChild(divCard).appendChild(cardHeader).appendChild(cardHeaderTxt);
    divCard.appendChild(cardBody).appendChild(cardTitle).appendChild(cardTitleTxt);
    cardBody.appendChild(cardText).appendChild(cardTextTxt);

}
getFromStorage();