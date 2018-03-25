var formesAtcions = {ajout: 0, suppression: 1};
var formesStyles = {plain: 0, dashed: 1};

function Drawing() {
  this.formes = [];
  this.undoRedo = new UndoRedo(this);

  this.getFormes = function () {
    return this.formes;
  }.bind(this);
};

function Forme(epaisseur, couleur, style) {
  this.epaisseur = epaisseur;
  this.couleur = couleur;
  this.style = style;

  this.getEpaisseur = function () {
    return this.epaisseur;
  }.bind(this);

  this.getCouleur = function () {
    return this.couleur;
  }.bind(this);

  this.getStyle = function () {
    return this.style;
  }.bind(this);
};

function Rectangle(x, y, largeur, hauteur, epaisseur, couleur, style) {
  Forme.call(this, epaisseur, couleur, style);
  this.x = x;
  this.y = y;
  this.largeur = largeur;
  this.hauteur = hauteur;

  this.getX = function () {
    return this.x;
  }.bind(this);

  this.getY = function () {
    return this.y;
  }.bind(this);

  this.getLargeur = function () {
    return this.largeur;
  }.bind(this);

  this.getHauteur = function () {
    return this.hauteur;
  }.bind(this);
};
Rectangle.prototype = new Forme();

function Line(xa, ya, xb, yb, epaisseur, couleur, style) {
  Forme.call(this, epaisseur, couleur, style);
  this.initx = xa;
  this.inity = ya;
  this.finalx = xb;
  this.finaly = yb;

  this.getInitX = function () {
    return this.initx;
  }.bind(this);

  this.getInitY = function () {
    return this.inity;
  }.bind(this);

  this.getFinalX = function () {
    return this.finalx;
  }.bind(this);

  this.getFinalY = function () {
    return this.finaly;
  }.bind(this);
};
Line.prototype = new Forme();

function Circle(x, y, rayon, epaisseur, couleur, style) {
  Forme.call(this, epaisseur, couleur, style);
  this.x = x;
  this.y = y;
  this.rayon = rayon;

  this.getX = function () {
    return this.x;
  }.bind(this);

  this.getY = function () {
    return this.y;
  }.bind(this);

  this.getRayon = function () {
    return this.rayon;
  }.bind(this);
};
Circle.prototype = new Forme();


function UndoRedo(drawing) {
  this.undoActions = [];
  this.redoActions = [];
  this.drawing = drawing;
  this.currIndex = 0;

  this.ajouter = function (forme) {
    this.drawing.getFormes().push(forme);
    this.undoActions.push(new ActionForme(formesAtcions.ajout, forme));
    this.currIndex++;
  }.bind(this);

  this.supprimer = function (indice) {
    var forms = this.drawing.getFormes();
    this.undoActions.push(new ActionForme(formesAtcions.suppression, forms[indice]));
    this.drawing.getFormes().splice(indice, 1);
    this.currIndex++;
  }.bind(this);

  this.undo = function () {
    if (this.undoActions.length > 0) {
      console.log("Undo function : " + this.undoActions.length);
      var action = this.undoActions.pop();
      this.redoActions.push(action);
      switch (action.action) {
        case formesAtcions.ajout:
          console.log("--> ajout");
          this.drawing.getFormes().splice(this.currIndex - 1, 1);
          this.currIndex--;
          break;
        case formesAtcions.suppression:
          console.log("--> suppress");
          this.drawing.undoRedo.ajouter(action.forme);
          this.currIndex--;
          break;
      }
      console.log("Undo done");
    }
  }.bind(this);

  this.redo = function () {
    if (this.redoActions.length > 0) {
      console.log("Redo function : " + this.redoActions.length);
      var action = this.redoActions.pop();
      switch (action.action) {
        case formesAtcions.ajout:
          console.log("--> ajout");
          this.drawing.undoRedo.ajouter(action.forme);
          break;
        case formesAtcions.suppression:
          // console.log("suppress -- ");
          break;
      }
      console.log("Redo done");
    }
  }.bind(this);
};


function ActionForme(action, forme) {
  this.action = action;
  this.forme = forme;
  this.index = -1;
};