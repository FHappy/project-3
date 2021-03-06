var cocktails = require('./../controllers/cocktail.controller.js');
var seeds = require('./../db/seeds.js');

module.exports = function(app) {
  app.route('/api/cocktails/seeds')
     .get(seeds);

  app.route('/api/cocktails')
     .get(cocktails.loadAll);

  app.route('/api/cocktails/search')
  	 .get(cocktails.searchCocktails);

  app.route('/api/cocktails/:cocktailId')
  	 .get(cocktails.loadCocktail)
     .patch(cocktails.editCocktail)
     .delete(cocktails.deleteCocktail);

  app.route('/api/cocktails/new')
     .post(cocktails.addCocktail);

  app.route('/api/cocktails/seeds/images')
     .get(cocktails.addImages);

  app.route('/api/cocktails/:cocktailId/reviews')
     .post(cocktails.addReview);
}
