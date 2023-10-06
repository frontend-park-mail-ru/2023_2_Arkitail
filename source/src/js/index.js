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
            login: 'goto-login-link',
            signup: 'goto-signup-link',
        }
    },

};

new Header(pages['list-of-places'].querySelector('header'), config.header)
let mainCarousel = new Carousel(pages['list-of-places'].querySelector('[main-carousel]'));
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


initRouting()

root.replaceChildren(pages[context.activePage])

