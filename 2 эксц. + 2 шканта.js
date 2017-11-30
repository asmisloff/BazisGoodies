//---------------------------------------
SHIFT = 60 // ������ �� ���� �����
STEP = 32
var  minifix = OpenFurniture('����. ��� 16 ��.f3d')
var pin = OpenFurniture('����� 8�30.f3d')
//---------------------------------------

main()

function main() {
    while (true) {
        var p1 = GetPanel("������� ������ ��� ����������");
        var p2 = GetPanel("������� ������ ��� �������");
        var p0 = GetPoint('�� ����� ������� �������� �����������? ������� �����.');

        if (ptype(p1) == "hor" && ptype(p2) == "vert")
        {
            minifix.Mount(p1, p2, center(p1).x, p0.y, p1.GabMax.z - SHIFT)
            minifix.Mount(p1, p2, center(p1).x, p0.y, p1.GabMin.z + SHIFT)
            pin.Mount(p1, p2, center(p1).x, p0.y, p1.GabMax.z - SHIFT - STEP)
            pin.Mount(p1, p2, center(p1).x, p0.y, p1.GabMin.z + SHIFT + STEP)
        }
        if (ptype(p1) == "vert" && ptype(p2) == "hor")
        {
            minifix.Mount(p1, p2, p0.x, center(p1).y, p1.GabMax.z - SHIFT)
            minifix.Mount(p1, p2, p0.x, center(p1).y, p1.GabMin.z + SHIFT)
            pin.Mount(p1, p2, p0.x, center(p1).y, p1.GabMax.z - SHIFT - STEP)
            pin.Mount(p1, p2, p0.x, center(p1).y, p1.GabMin.z + SHIFT + STEP)
        }

        if (ptype(p1) == "vert" && ptype(p2) == "front")
        {
            minifix.Mount(p1, p2, p0.x, p1.GabMax.y - SHIFT, center(p1).z)
            minifix.Mount(p1, p2, p0.x, p1.GabMin.y + SHIFT, center(p1).z)
            pin.Mount(p1, p2, p0.x, p1.GabMax.y - SHIFT - STEP, center(p1).z)
            pin.Mount(p1, p2, p0.x, p1.GabMin.y + SHIFT + STEP, center(p1).z)
        }

        if (ptype(p1) == "front" && ptype(p2) == "vert")
        {
            minifix.Mount(p1, p2, center(p1).x, p1.GabMax.y - SHIFT, p0.z)
            minifix.Mount(p1, p2, center(p1).x, p1.GabMin.y + SHIFT, p0.z)
            pin.Mount(p1, p2, center(p1).x, p1.GabMax.y - SHIFT - STEP, p0.z)
            pin.Mount(p1, p2, center(p1).x, p1.GabMin.y + SHIFT - STEP, p0.z)
        }

        if (ptype(p1) == "front" && ptype(p2) == "hor")
        {
            minifix.Mount(p1, p2, p1.GabMax.x - SHIFT, center(p1).y, p0.z)
            minifix.Mount(p1, p2, p1.GabMin.x + SHIFT, center(p1).y, p0.z)
            pin.Mount(p1, p2, p1.GabMax.x - SHIFT - STEP, center(p1).y, p0.z)
            pin.Mount(p1, p2, p1.GabMin.x + SHIFT + STEP, center(p1).y, p0.z)
        }

        if (ptype(p1) == "hor" && ptype(p2) == "front")
        {
            minifix.Mount(p1, p2, p1.GabMax.x - SHIFT, p0.y, center(p1).z)
            minifix.Mount(p1, p2, p1.GabMin.x + SHIFT, p0.y, center(p1).z)
            pin.Mount(p1, p2, p1.GabMax.x - SHIFT - STEP, p0.y, center(p1).z)
            pin.Mount(p1, p2, p1.GabMin.x + SHIFT + STEP, p0.y, center(p1).z)
        }

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