function DnD(canvas, interactor) {
  this.initX = 0;
  this.initY = 0;
  this.finalX = 0;
  this.finalY = 0;
  this.pression = false;
  this.moving = false;


  this.mousedown = function (event) {
    var pos = getMousePosition(canvas, event);
    this.initX = pos.x;
    this.initY = pos.y;
    this.pression = true;
    interactor.onInteractionStart(this);

    console.log("mousedown");
  }.bind(this);

  this.mousemove = function (event) {
    if (this.pression){
      this.moving = true;
      var pos = getMousePosition(canvas, event);
      this.finalX = pos.x;
      this.finalY = pos.y;
      interactor.onInteractionUpdate(this);
      console.log("mousemove");
    }
  }.bind(this);

  this.mouseup = function (event) {
    if (this.moving){
      var pos = getMousePosition(canvas, event);
      this.finalX = pos.x;
      this.finalY = pos.y;
      this.pression = false;
      this.moving = false;

      interactor.onInteractionEnd(this);
      console.log("mouseup");
    }
  }.bind(this);

  // Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener('mousedown', this.mousedown, false);
  canvas.addEventListener('mousemove', this.mousemove, false);
  canvas.addEventListener('mouseup', this.mouseup, false);
}
// Place le point de l'événement event relativement à la position du canvas.
function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(event.clientX - rect.left),
    y: Math.round(event.clientY - rect.top)
  };
}