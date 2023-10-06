const config = {
    header: {
        leftMenu: {
            search: {
                name: 'Поиск',
                className: 'active',
                showToUnauthorized: true,
            },
            trips: {
                name: 'Поездки',
                className: '',
                showToUnauthorized: false,
            },
            album: {
                name: 'Альбом',
                className: '',
                showToUnauthorized: false,
            },
            logout: {
                name: 'Выйти',
                className: 'logout',
                showToUnauthorized: false,
            },
        },
        urlClass: {
            favourites: '',
            login: 'goto-login-list-of-places-link',
            signup: 'goto-signup-list-of-places-link',
        }
    },

};

new Header(document.querySelector('header'), config.header)
let carousel = new Carousel(document.querySelector('[main-carousel]'));
let listOfPlaces = new ListOfPlaces(document.querySelector('[main-list-of-places]'));
new Footer(document.querySelector('footer'))

fetch(
    '/api/v1/places',
    {
        method: 'GET',
    }
)
    .then(response => response.json())
    .then(function (result) {
    
        for (const [_, place] of result.entries()) {
            carousel.appendSlide(place)
            listOfPlaces.appendPlace(place)
        }
    });



