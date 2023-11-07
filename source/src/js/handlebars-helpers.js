Handlebars.registerHelper( 'eachInMap', function (map, block) {
  var out = '';
  for (let [k, v] of map) {
    out += block.fn({key: k, value: v});
  }

  return out;
});
