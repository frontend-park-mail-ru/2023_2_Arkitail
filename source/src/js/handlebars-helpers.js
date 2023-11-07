Handlebars.registerHelper("stars", function (n, rating, block) {
  var accum = "";
  for (var i = 1; i <= n; ++i) {
    block.data.active = rating >= i ? "active" : "";
    block.data.number = i;
    accum += block.fn(i);
  }
  return accum;
});
Handlebars.registerHelper( 'eachInMap', function (map, block) {
  var out = '';
  for (let [k, v] of map) {
    console.log(v);
    out += block.fn({key: k, value: v});
  }

  return out;
});
