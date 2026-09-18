//hamburger menu a comparsa
function show() {
    const menu = document.getElementById("menucont");
    const isMobile = window.matchMedia("(max-width: 1100px)").matches;

    if (isMobile) {
        // Se la media query è attiva, mostra/nascondi il menu
        menu.classList.toggle("openmenu");
    }
}

//sezione servizi animazione
const services = document.querySelectorAll('.left, .right');

window.addEventListener('scroll', () => {
    services.forEach(service => {
      const posizione = service.getBoundingClientRect().top;
      const altezzaFinestra = window.innerHeight;
      if (posizione < altezzaFinestra - 100) { 
        service.classList.add('visible');
      }
    });
  });
  
//prevent user from selecting past dates
document.addEventListener('DOMContentLoaded', function () {
    var checkinInput = document.getElementById('checkin');
    var checkoutInput = document.getElementById('checkout');
    
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var tomorrowFormatted = tomorrow.toISOString().split('T')[0];

    // setting min dates
    checkinInput.setAttribute('min', tomorrowFormatted);
    checkoutInput.setAttribute('min', tomorrowFormatted);
});

// dynamic updates
document.getElementById('checkin').addEventListener('change', function () {
    var checkinDate = new Date(this.value);
    var checkoutInput = document.getElementById('checkout');
    
    var checkinFormatted = this.value;
    checkoutInput.setAttribute('min', checkinFormatted);

    if (new Date(checkoutInput.value) < checkinDate) {
        checkoutInput.value = checkinFormatted;
    }
});

//info rooms a comparsa
document.addEventListener('DOMContentLoaded', function () {
    const roomOptions = document.querySelectorAll('.room-option.desktop');
    const roomGalleries = document.querySelectorAll('.room_gallery');
    let isMobile = window.matchMedia("(max-width: 500px)").matches;;

    roomOptions.forEach(function (roomOption, index) {
        
        if (roomOption.classList.contains('comfort')) {
            if (isMobile) {
                roomOption = document.querySelector('.room-option.comfort.mobile');
            } else {
                roomOption = document.querySelector('.room-option.comfort.desktop');
            }
        }
        if (roomOption.classList.contains('vasca')) {
            if (isMobile) {
                roomOption = document.querySelector('.room-option.vasca.mobile');
            } else {
                roomOption = document.querySelector('.room-option.vasca.desktop');
            }
        }
        roomOption.addEventListener('click', function () {
            // Nascondi tutte le room_gallery tranne quella corrente
            roomGalleries.forEach(function (roomGallery, galleryIndex) {
                if (index === galleryIndex) {
                    if (roomGallery.classList.contains('padding')) {
                        roomGallery.classList.toggle('open');
                        setTimeout(function () {
                            roomGallery.classList.remove('padding');
                        }, 500);
                    } else {
                        roomGallery.classList.toggle('padding');
                        setTimeout(function () {
                            roomGallery.classList.toggle('open');
                        }, 500);
                    }
                } else {
                    roomGallery.classList.remove('open');
                    setTimeout(function () {
                        roomGallery.classList.remove('padding');
                    }, 500); 
                }
            });
        });
    });
});

//price generator
document.querySelector(".bookbutton").addEventListener("click", function(event){
    event.preventDefault();
    showWindow();
    getprice();
})

function showWindow() {
    let windows = document.querySelectorAll(".windows"); // Seleziona tutti gli elementi con la classe 'windows'
    windows.forEach(window => {
        window.style.display = "block"; // Assicurati che la finestra venga visualizzata
        setTimeout(() => {  // Dopo un breve ritardo, applica la transizione
            window.classList.add("show");
        }, 15);
    });
}

function getprice() {

    const selected = {
        adults : parseInt(document.querySelector('.adults').value) || 1,
        kids : parseInt(document.querySelector('.kids').value) || 0,
        season : calculateSeason(document.querySelector('#checkin').value, document.querySelector('#checkin').value),
        board : parseInt(document.querySelector('.board').value),
        nRooms : parseInt(document.querySelector('.nrooms').value) || 1
    }
    let people = selected.adults + selected.kids;
    let roomRates = {
        economyr: 69,
        comfortr: 85,
        deluxes: 102,
        jacuzzi: 120
    };
    let prices = [];
    let guestsPerRoomRatio = people / selected.nRooms;
    let maxGuestsPerRoomRatio = 4;
    
    for (let el in roomRates) {
        if (people > 2 && el === 'jacuzzi') {  // jacuzzi room only for two people
            displayUnavailable(el);  
            continue;
        } else if (people <= 2 && el === 'jacuzzi') { 
            restorePrice(el);  
        }
        if (guestsPerRoomRatio > maxGuestsPerRoomRatio) { //too many people for room
            displayMessage(el); 
        } else {
            restorePrice(el); 
        }
            
        let basePrice = roomRates[el];
        let price = basePrice 
        + (basePrice*(10/100))*(selected.adults-1)    /*increase 10% for every adult*/
        + (basePrice*(5/100))*selected.kids           /*increase 5% for every kid*/
        + (basePrice*(10/100))*selected.season        /*increase 10% for season*/  
        + (basePrice*(10/100))*selected.board         /*increase for half, full board*/  
        prices.push(price.toFixed(2));
    
        }displayPrice(prices);
    return prices
}

//display a message when too many people for a room/reset price
function displayMessage(el) {
    let priceCont = document.querySelector(`.priceCont.${el}`);
    if (priceCont) {
        priceCont.textContent = "Il numero di ospiti per stanza è troppo elevato. Considera di aggiungere stanze o ridurre il numero di ospiti.";

        let disButton = priceCont.closest('.windows').querySelector(".tiny"); //disable button
        if (disButton) {
            disButton.disabled = true;
            disButton.style.backgroundColor = "#543616";
            disButton.style.cursor = "not-allowed";
        }
    }
}
function displayUnavailable(el) {
    let priceConts = document.querySelectorAll(".priceCont");
    priceConts.forEach(priceCont => {
        if (priceCont.classList.contains(el)) {
            if (el === "jacuzzi") {
                priceCont.textContent = "Questa stanza non è disponibile per più di 2 ospiti";
                
                // Disabilita il pulsante "Prenota" relativo a questa stanza
                let disButton = priceCont.closest('.windows').querySelector(".tiny");
                disButton.disabled = true;
                disButton.style.backgroundColor = "#543616";
                disButton.style.cursor = "not-allowed";
            }
        }
    });
}
function restorePrice(el) {
    let priceConts = document.querySelectorAll(".priceCont");
    priceConts.forEach(priceCont => {
        if (priceCont.classList.contains(el)) {
            let num;
        if (el === 'economyr') {
            num = 'num1';
        } else if (el === 'comfortr') {
            num = 'num2';
        } else if (el === 'deluxes') {
            num = 'num3';
        } else if (el === 'jacuzzi') {
            num = 'num4';
        }
        priceCont.innerHTML = `<span id="${num}"></span>/notte`;
                
        let enableButton = priceCont.closest('.windows').querySelector(".tiny");
        enableButton.disabled = false;
        enableButton.style.backgroundColor = "";  // Ripristina lo stile predefinito
        enableButton.style.cursor = "pointer";  // Ripristina il cursore 
        }
    });
}

//season computing using selected dates
function calculateSeason(checkin, checkout) {
    let checkinDate = new Date(checkin).getTime();
    let checkoutDate = new Date(checkout).getTime();
    let midpoint = new Date((checkinDate+checkoutDate)/2);

    let month = midpoint.getMonth()+1; //getmonth outputs 0-11
    let day = midpoint.getDate();

    if ((month===7)||(month===8)){
        return 2; //high season
    }else if ((month===6 && day>=15)||(month===9 && day<15)){
        return 1; //midseason
    }else{
        return 0; //low season
    }
}

function displayPrice(prices) {
    const spaces = ["num1", "num2", "num3", "num4"];
    spaces.forEach(id => {
        const space = document.getElementById(id);
        if (space) space.innerHTML="";
    })
    
    prices.forEach((price, index) => {
        const space = document.getElementById(spaces[index]);
        if (space) {
            space.textContent = `${price} €`;
        }
    });
}