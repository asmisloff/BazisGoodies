//---------------------------------------
SHIFT = 60 // ќтступ от кра€ полки
fix = OpenFurniture('KON 7,0 x 50 IB.f3d')
//---------------------------------------

side1 = GetPanel("”кажите 1-ую боковину");
side2 = GetPanel("”кажите 2-ую боковину");

while (true) {
    shelf = GetPanel("”кажите полку");
    z_back = shelf.GabMin.z;
    z_front = shelf.GabMax.z;

    fix.Mount(shelf, side1, 0, 0, z_back + SHIFT)
    fix.Mount(shelf, side2, 0, 0, z_back + SHIFT)

    fix.Mount(shelf, side1, 0, 0, z_front - SHIFT)
    fix.Mount(shelf, side2, 0, 0, z_front - SHIFT)
    Action.Commit();
}