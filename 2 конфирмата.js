//---------------------------------------
SHIFT = 60 // ќтступ от кра€ полки
fix = OpenFurniture('KON 7,0 x 50 IB.f3d')
//---------------------------------------

main()

function main() {
    while (true) {
        p1 = GetPanel("”кажите панель под отв. d5");
        p2 = GetPanel("”кажите панель под отв. d7");

        if ((ptype(p1) == "vert" && ptype(p2) == "hor") ||
            (ptype(p1) == "hor" && ptype(p2) == "vert"))
        {
            fix.Mount(p1, p2, 0, 0, p1.GabMax.z - SHIFT)
            fix.Mount(p1, p2, 0, 0, p1.GabMin.z + SHIFT)
        }
        if ((ptype(p1) == "vert" && ptype(p2) == "front") ||
            (ptype(p1) == "front" && ptype(p2) == "vert"))
        {
            fix.Mount(p1, p2, 0, p1.GabMax.y - SHIFT, 0)
            fix.Mount(p1, p2, 0, p1.GabMin.y + SHIFT, 0)
        }
        if ((ptype(p1) == "front" && ptype(p2) == "hor") ||
            (ptype(p1) == "hor" && ptype(p2) == "front"))
        {
            fix.Mount(p1, p2, p1.GabMax.x - SHIFT, 0, 0)
            fix.Mount(p1, p2, p1.GabMin.x + SHIFT, 0, 0)
        }

        Action.Commit();
    }
}

function ptype(panel) {
    //returns type of panel, eg front, hor or vert, as a string
    EPS = 0.01
    dx = panel.GabMax.x - panel.GabMin.x
    dy = panel.GabMax.y - panel.GabMin.y
    dz = panel.GabMax.z - panel.GabMin.z
    th = panel.Thickness

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