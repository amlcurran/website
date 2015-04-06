this.bootstrap = function() {

  var theLoader = loader();
  var theChipsView = chipsView();
  var theController = controller();
  theLoader.load(theChipsView);
  theController.link();

};

bootstrap.apply(this);