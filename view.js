// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Forme.prototype.paint = function (ctx) {
  ctx.beginPath();
  ctx.lineWidth = this.epaisseur;
  ctx.strokeStyle = this.couleur;
};

function setStyle(ctx, forme) {
  if (forme.getStyle() == 0) {
    ctx.setLineDash([]);
  } else {
    ctx.setLineDash([10, 5]);
  }
}

Rectangle.prototype.paint = function (ctx) {
  ctx.beginPath();
  setStyle(ctx, this);
  ctx.lineWidth = this.getEpaisseur();
  ctx.strokeStyle = this.getCouleur();
  ctx.rect(this.getX(), this.getY(), this.getLargeur(), this.getHauteur());
  ctx.stroke();
};

Line.prototype.paint = function (ctx) {
  ctx.beginPath();
  setStyle(ctx, this);
  ctx.lineWidth = this.getEpaisseur();
  ctx.strokeStyle = this.getCouleur();
  ctx.moveTo(this.getInitX(), this.getInitY());
  ctx.lineTo(this.getFinalX(), this.getFinalY());
  ctx.stroke();
};

Circle.prototype.paint = function (ctx) {
  ctx.beginPath();
  setStyle(ctx, this);
  ctx.lineWidth = this.getEpaisseur();
  ctx.strokeStyle = this.getCouleur();
  ctx.arc(this.getX(), this.getY(), this.getRayon(), 0, 2 * Math.PI);
  ctx.stroke();
};

Drawing.prototype.paint = function (ctx, canvas) {
  ctx.fillStyle = '#F0F0F0'; // set canvas' background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  this.formes.forEach(function (eltDuTableau) {
    eltDuTableau.paint(ctx);
  });
};