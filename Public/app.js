'use strict';

var pokemon = function() {
  $.ajax({
    url: 'http://pokeapi.co/api/v2/pokemon/1',
    dataType: 'json',
    method: 'GET',
    success: function(data, message, xhr) {
      console.log('my data: ', data);
    },
    fail: function(err) {
      console.err(err);
    }
  });
};

$('.pokemon').text(pokemon.name);
