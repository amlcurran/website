this.bootstrap = function() {

  var theLoader = loader();
  var theChipsView = chipsView();
  theLoader.load(theChipsView);
  controller().link();

};

bootstrap.apply(this);