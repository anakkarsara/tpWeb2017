var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 600;

// Code temporaire pour tester l'affiche de la vue
var rec = new Rectangle(10, 20, 200, 100, 10, 'red',0);
var ligne = new Line(20, 500, 275, 133, 8, '#000AAA');
var ligne2 = new Line(660, 150, 422, 470, 10, 'green',0);
var circle = new Circle(350, 200, 100, 10, 'blue',1);
var circle2 = new Circle(350, 400, 100, 10, 'red',0);

var drawing = new Drawing();

drawing.undoRedo.ajouter(rec);
drawing.undoRedo.ajouter(ligne);
drawing.undoRedo.ajouter(ligne2);
drawing.undoRedo.ajouter(circle);
drawing.undoRedo.ajouter(circle2);

drawing.paint(ctx, canvas);

// Code final à utiliser pour manipuler Pencil.
var pencil = new Pencil(ctx, drawing, canvas);

function removeForm(index) {
  drawing.undoRedo.supprimer(index);
  pencil.updateShapeList();
  drawing.paint(ctx, canvas);
  console.log("remove : " + index);
}

function switchShape(index) {
  switch (index) {
    case editingMode.rect:
      pencil.currEditingMode = index;
      break;
    case editingMode.line:
      pencil.currEditingMode = index;
      break;
    case editingMode.circle:
      pencil.currEditingMode = index;
      break;
  }
}

function undo() {
  drawing.undoRedo.undo();
  drawing.paint(ctx, canvas);
  pencil.updateShapeList();
}

function redo() {
  drawing.undoRedo.redo();
  drawing.paint(ctx, canvas);
  pencil.updateShapeList();
}