//---------------------------------------
SHIFT = 60 // ������ �� ���� �����
fix = OpenFurniture('KON 7,0 x 50 IB.f3d')
//---------------------------------------

side1 = GetPanel("������� 1-�� ��������");
side2 = GetPanel("������� 2-�� ��������");

while (true) {
    shelf = GetPanel("������� �����");
    z_back = shelf.GabMin.z;
    z_front = shelf.GabMax.z;

    fix.Mount(shelf, side1, 0, 0, z_back + SHIFT)
    fix.Mount(shelf, side2, 0, 0, z_back + SHIFT)

    fix.Mount(shelf, side1, 0, 0, z_front - SHIFT)
    fix.Mount(shelf, side2, 0, 0, z_front - SHIFT)
    Action.Commit();
}