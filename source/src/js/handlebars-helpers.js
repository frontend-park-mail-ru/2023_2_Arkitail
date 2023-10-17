Handlebars.registerHelper('or', (...x) => {
    const options = x[-1];
    x = x.slice(0, -1);

    if (Array.prototype.some(x)) {
        return options.fn(this);
    }
});
