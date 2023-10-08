const config = {
    header: {
        leftMenu: {
            search: {
                name: 'Поиск',
                showToUnauthorized: true,
            },
            trips: {
                name: 'Поездки',
                showToUnauthorized: false,
            },
            album: {
                name: 'Альбом',
                showToUnauthorized: false,
            },
        },
        urls: {
            favourites: '',
            login: 'login',
            signup: 'signup',
        }
    },

};

header = new Header(pages['list-of-places'].querySelector('header'), config.header);
let mainCarousel = new Carousel(pages['list-of-places'].querySelector('[main-carousel]'), 1);
let listOfPlaces = new ListOfPlaces(pages['list-of-places'].querySelector('[main-list-of-places]'));
new Footer(pages['list-of-places'].querySelector('footer'))

new LoginForm(pages['login'].querySelector('[login-form]'))
new SignupForm(pages['signup'].querySelector('[signup-form]'))

fetch(
    '/api/v1/places',
    {
        method: 'GET',
    }
)
    .then(response => response.json())
    .then(function (result) {
        for (const [_, place] of result.entries()) {
            mainCarousel.appendSlide(place)
            listOfPlaces.appendPlace(place)
        }
    });


root.replaceChildren(pages[context.activePage])

