import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Alquiler } from 'src/app/core/interfaces/alquiler';

@Component({
  selector: 'app-pop-up-home-vendedor',
  templateUrl: './pop-up-home-vendedor.component.html',
  styleUrls: ['./pop-up-home-vendedor.component.css']
})
export class PopUpHomeVendedorComponent implements OnInit {

  alquiler: Alquiler;  
  constructor(
    public dialogRef: MatDialogRef<PopUpHomeVendedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {alquiler: Alquiler},
    private dialog: MatDialog
  ) { 
    this.alquiler = data.alquiler;
  }

  ngOnInit(): void {
  }

}
