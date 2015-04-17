this.bootstrap = function() {

  var theLoader = loader();
  var theChipsView = chipsView();
  var theTalksView = talksView();
  var theController = controller();
  theLoader.load('./chips/chip-data.json', theChipsView);
  theLoader.load('./talks/talks-data.json', theTalksView);
  theController.link();

};

bootstrap.apply(this);