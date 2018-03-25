var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = 650;
canvas.height = 500;

// Code temporaire pour tester l'affiche de la vue
var rec = new Rectangle(320, 250, 200, 100, 10, 'black',1);
var ligne = new Line(600, 150, 275, 133, 8, 'blue',0);
var ligne2 = new Line(620, 150, 422, 470, 10, 'green',0);
var rec2 = new Rectangle(220, 100, 200, 100, 10,'yellow',0);
var circle2 = new Circle(150, 200, 80, 10, 'red',0);

var drawing = new Drawing();

drawing.undoRedo.ajouter(rec);
drawing.undoRedo.ajouter(ligne);
drawing.undoRedo.ajouter(ligne2);
drawing.undoRedo.ajouter(rec2);
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