this.bootstrap = function() {

  var theLoader = loader();
  var theChipsView = chipsView();
  var theController = controller();
  theLoader.load('./chips/chip-data.json', theChipsView);
  theController.link();

};

bootstrap.apply(this);