function onReady(callback) {
    const intervalId = setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            clearInterval(intervalId);
            callback.call(this);
        }
    }, 2000);
}

function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function() {
    setVisible('#index-page-body', true);
    setVisible('#loading', false);
});


class getHotelsList {
    _bodyMainDiv;
    _data = [];

    constructor(bodyMainDiv) {
        this._bodyMainDiv = bodyMainDiv;
        this.init();
    }

     init() {
        this._bodyMainDiv.classList.add('page-flex');
        const title = document.createElement('div');
        title.classList.add('page-flex-item', 'heading');
        const heading = document.createElement('h1');
        heading.innerText = 'Hotels List';
        title.appendChild(heading);
        this._bodyMainDiv.appendChild(title);
         this.fetchData();
    }

     fetchData() {
        fetch(
         'https://rondon7.github.io/indexPageData.json'
        ).then(
            res => res.json()
        ).then(
         result => {
             setTimeout(() => {
                 this._data = result;
                 this.renderHotelsList(this._data)
             }, 2000)
         });
    }

    renderHotelsList(data) {
        const hotelsCards = document.createElement('div');
        hotelsCards.classList.add('page-flex-item', 'hotels-cards');
        data.map(hotelData => {
            const hl = document.createElement('a');
            hl.classList.add('hotels-cards-item');
            hl.href = "./hotelDetail.html";

            const hotelCard = document.createElement('div');
            hotelCard.classList.add('hotel-card');

            const image = document.createElement('div');
            image.classList.add('hotel-card-item', 'hotel-pic');

            const hotelPrimaryImage = document.createElement("img");
            hotelPrimaryImage.classList.add('hotel-primary-pic');
            hotelPrimaryImage.src = hotelData.image;

            image.appendChild(hotelPrimaryImage);

            hotelCard.appendChild(image);

            const hotelInfo = document.createElement('div');
            hotelInfo.classList.add('hotel-card-item', 'hotel-info');

            const hotelDetails = document.createElement('div');
            hotelDetails.classList.add('hotel-info-item', 'hotel-details');

            const title = document.createElement('h2');
            title.classList.add('hotel-details-item', 'hotel-title');
            title.innerText = hotelData.name;

            hotelDetails.appendChild(title);

            const address = document.createElement('h4');
            address.classList.add('hotel-details-item', 'hotel-address');
            address.innerText = hotelData.address;

            hotelDetails.appendChild(address);

            hotelInfo.appendChild(hotelDetails);

            const hotelPrice = document.createElement('div');
            hotelPrice.classList.add('hotel-info-item', 'hotel-price');
            hotelPrice.style.margin = 'auto';

            const minText = document.createElement('h6');
            minText.style.textAlign = 'center';
            minText.innerText = "Rooms starting from";

            const values = Object.values(hotelData.roomRates);
            const minHotelPrice = document.createElement('h3');
            minHotelPrice.style.textAlign = 'center';
            minHotelPrice.innerText = "Rs. " + Math.min(...values).toString();

            const taxText = document.createElement('h6');
            taxText.style.textAlign = 'center';
            taxText.innerText = "(inclusive of all taxes)";

            hotelPrice.appendChild(minText);
            hotelPrice.appendChild(minHotelPrice);
            hotelPrice.appendChild(taxText);

            hotelInfo.appendChild(hotelPrice);

            hotelCard.appendChild(hotelInfo);

            hl.appendChild(hotelCard);

            hotelsCards.appendChild(hl);
        });
        this._bodyMainDiv.appendChild(hotelsCards);
    }
}

const bodyMainDiv = document.getElementById('index-page-body');
const hotelsList = new getHotelsList(bodyMainDiv);