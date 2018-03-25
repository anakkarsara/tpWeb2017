// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Forme.prototype.paint = function (context) {
  context.beginPath();
  context.lineWidth = this.epaisseur;
  context.strokeStyle = this.couleur;
};

function setStyle(context, forme) {
  if (forme.getStyle() == 0) {
    context.setLineDash([]);
  } else {
    context.setLineDash([10, 5]);
  }
}

Rectangle.prototype.paint = function (context) {
  context.beginPath();
  setStyle(context, this);
  context.lineWidth = this.getEpaisseur();
  context.strokeStyle = this.getCouleur();
  context.rect(this.getX(), this.getY(), this.getLargeur(), this.getHauteur());
  context.stroke();
};

Line.prototype.paint = function (context) {
  context.beginPath();
  setStyle(context, this);
  context.lineWidth = this.getEpaisseur();
  context.strokeStyle = this.getCouleur();
  context.moveTo(this.getInitX(), this.getInitY());
  context.lineTo(this.getFinalX(), this.getFinalY());
  context.stroke();
};

Circle.prototype.paint = function (context) {
  context.beginPath();
  setStyle(context, this);
  context.lineWidth = this.getEpaisseur();
  context.strokeStyle = this.getCouleur();
  context.arc(this.getX(), this.getY(), this.getRayon(), 0, 2 * Math.PI);
  context.stroke();
};

Drawing.prototype.paint = function (context, canvas) {
  context.fillStyle = '#F0F0F0';
  context.fillRect(0, 0, canvas.width, canvas.height);
  this.formes.forEach(function (eltDuTableau) {
    eltDuTableau.paint(context);
  });
};