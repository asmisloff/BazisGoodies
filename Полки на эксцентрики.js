//---------------------------------------
SHIFT = 60 // ������ �� ���� �����
STEP = 32
var  minifix = OpenFurniture('����. ��� 16 ��.f3d')
var pin = OpenFurniture('����� 8�30.f3d')
//---------------------------------------

main()

function main() {
    var side1 = GetPanel("������� ������ ��������");
    var side2 = GetPanel("������� ������ ��������");
    while (true) {
        var shelf = GetPanel("������� �����");

        [side1, side2].forEach(
            function(side) {
                minifix.Mount(shelf, side, center(shelf).x, shelf.GabMin.y, shelf.GabMax.z - SHIFT)
                minifix.Mount(shelf, side, center(shelf).x, shelf.GabMin.y, shelf.GabMin.z + SHIFT)
                pin.Mount(shelf, side, center(shelf).x, shelf.GabMin.y, shelf.GabMax.z - SHIFT - STEP)
                pin.Mount(shelf, side, center(shelf).x, shelf.GabMin.y, shelf.GabMin.z + SHIFT + STEP)
            })

        Action.Commit();
    }
}

function ptype(panel) {
    //returns type of panel, eg front, hor or vert, as a string
    EPS = 0.01
    var dx = panel.GabMax.x - panel.GabMin.x
    var dy = panel.GabMax.y - panel.GabMin.y
    var dz = panel.GabMax.z - panel.GabMin.z
    var th = panel.Thickness

    if (Math.abs(dx - th) <= EPS) {
        return "vert"
    }
    else if (Math.abs(dy - th) <= EPS) {
        return "hor"
    }
    else if (Math.abs(dz - th) <= EPS){
        return "front"
    }
    else { //general case: rotated panel
        return "rot"
    }
}

function center(panel) {
    return {'x' : (panel.GabMax.x + panel.GabMin.x) / 2.0,
            'y' : (panel.GabMax.y + panel.GabMin.y) / 2.0,
            'z' : (panel.GabMax.z + panel.GabMin.z) / 2.0}
}