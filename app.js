//Form Input fields
const cardHolderInput = document.getElementById('card-holder'),
    cardNumberInput = document.getElementById('card-number'),
    cardExpirationMonth = document.getElementById('card-expiration-month'),
    cardExpirationYear = document.getElementById('card-expiration-year'),
    cardCvvInput = document.getElementById('card-cvv');

//Card fields
const holderName = document.getElementById('card-holder-name'),
    cardNumber = document.querySelector('.number'),
    expiryDate = document.querySelector('#expiry-date-on-card'),
    cvvNumber = document.getElementById('cvv-on-card'),
    cardLogo = document.querySelectorAll('.logo');


//To have a random background image of the card
document.addEventListener('DOMContentLoaded', () => {
    cardNumber.textContent = '#### #### #### ####'

    let random = Math.floor(Math.random() * 25) + 1;
    document.querySelector('.credit-card-box .front').style.backgroundImage = `url(images/${random}.jpeg)`
    document.querySelector('.credit-card-box .back').style.backgroundImage = `url(images/${random}.jpeg)`
})


//Input event for card holder
cardHolderInput.addEventListener('keyup', (event) => {
    let value = event.target.value.toUpperCase();
    holderName.textContent = value;
})

//Keyup Event on card number input field
let count = 0, str = '', cardType;
cardNumberInput.addEventListener('keyup', (event) => {

    let val = event.target.value, cardLength = cardNumber.textContent.length;
    const cardValid = document.querySelector('.cardValid');
    cardNumber.textContent = val;

   
    count++;

    if (count === 4 && cardLength<=19 && val.length<=19) {
        cardNumberInput.value += '-';
        cardNumber.innerHTML += '-';
        count = 0;
    }

    //Check if the credit card number is valid
    if (val.length > 1) {
        let isCardValid = validateCreditCardNumber(cardNumberInput.value)
        if (isCardValid) {
            cardValid.innerHTML = "Card is Valid!"
        } else {
            cardValid.innerHTML = "Card is invalid. Please enter a valid number."
        }
    }

    //gets the type of the credit card
    if (val.length >= 1) {
        cardType = getCardType(cardNumberInput.value)

        if (cardType != "") {
            cardLogo.forEach((card) => {
                card.innerHTML = `<img src="images/${cardType}.png">`;
            })
        }
    }
})

//Event listeners on Expiry date and cvv number
cardExpirationMonth.addEventListener('change', (event) => {
    expiryDate.textContent = `${event.target.value} /`;
})
cardExpirationYear.addEventListener('change', (event) => {
    expiryDate.textContent += ` ${event.target.value}`
})

cardCvvInput.addEventListener('keyup', (event) => {
    cvvNumber.textContent = event.target.value;
})



// Function to check if a card is valid or not
function validateCreditCardNumber(cardNumber) {
    cardNumber = cardNumber.split('-').join("");
    if (parseInt(cardNumber) <= 0 || (!/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
        return false;
    }
    var carray = new Array();
    for (var i = 0; i < cardNumber.length; i++) {
        carray[carray.length] = cardNumber.charCodeAt(i) - 48;
    }
    carray.reverse();
    var sum = 0;
    for (var i = 0; i < carray.length; i++) {
        var tmp = carray[i];
        if ((i % 2) != 0) {
            tmp *= 2;
            if (tmp > 9) {
                tmp -= 9;
            }
        }
        sum += tmp;
    }
    return ((sum % 10) == 0);
}


function getCardType(number) {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard 
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        return "mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "amex";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "dinersclub";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "jcb";

    // Unionpay
    re = new RegExp("^(62|88)");
    if (number.match(re) != null)
        return "unionpay";

    return "";
}