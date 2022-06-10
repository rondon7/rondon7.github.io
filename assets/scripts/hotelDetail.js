const QueryString = window.location.search;
const urlParams = new URLSearchParams(QueryString);

const id = urlParams.get("q");
const pathUrl = "https://rondon7.github.io/" + id + ".json";

class getHotelDetail {
    _bodyMainDiv;
    _data = [];

    constructor(bodyMainDiv) {
        this._bodyMainDiv = bodyMainDiv;
        this.init();
    }

    init() {
        this._bodyMainDiv.classList.add('page-flex');
        this.fetchData();
    }

    fetchData() {
        fetch(
            pathUrl
        ).then(
            res => res.json()
        ).then(
            result => {
                this._data = result;
                this.renderHotelsList(this._data)
            });
    }

    renderHotelsList(data) {
        data.map(hotelData => {
            const title = document.createElement('div');
            const heading = document.createElement('h1');
            heading.innerText = hotelData.name;
            title.appendChild(heading);
            this._bodyMainDiv.appendChild(title);
        });
    }
}

const bodyMainDiv = document.getElementById('detail-page-body');
const hotelDetail = new getHotelDetail(bodyMainDiv);

document.getElementById('go-back').addEventListener('click', () => {
    history.back();
});