import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Alquiler } from 'src/app/core/interfaces/alquiler';
import { AlquilerService } from 'src/app/core/services/alquiler.service';
import { UserService } from 'src/app/core/services/user.service';
import { PopUpHomeVendedorComponent } from '../pop-up-home-vendedor/pop-up-home-vendedor.component';
import { MatDialog } from '@angular/material/dialog';

export interface Usuario {
  nombre: string;
  direccion: string;
  pedidos: Pedido[];
}
export interface Pedido {
  nombreC: string;
  fechaInicio: string;
  fechaFin: string;
  unidades: number;
}
@Component({
  selector: 'app-vista-home-vendedor',
  templateUrl: './vista-home-vendedor.component.html',
  styleUrls: ['./vista-home-vendedor.component.css'],
})
export class VistaHomeVendedorComponent implements OnInit {
  alquileresPendientes: Alquiler[] = [];

  // Variable sujeta al usuario
  esVendedor: boolean = true;
  greetingMessage: string = '';
  user: any = localStorage.getItem('user');

  constructor(
    private usersev: UserService,
    private router: Router,
    private alquilerServ: AlquilerService,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
  }

  // this.esVendedor = this.authService.esVendedor();
  ngOnInit() {
    this.setGreetingMessage();
    this.alquilerServ.getRevision().subscribe((data) => {
      this.alquileresPendientes = data;
      console.log(data);
    });
    this.user = JSON.parse(this.user)
  }

  setGreetingMessage() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      this.greetingMessage = 'Buenos días';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greetingMessage = 'Buenas tardes';
    } else {
      this.greetingMessage = 'Buenas noches';
    }
  }

  // Simula  eliminar un pedido  debemo cambiarlo por aprobado o rechazado
  tomarPedido(option: number, alq:Alquiler) { //opcion 0 rechaza opcion 1 acepta
    alq.verificadoPor = this.user.id;
    if (option == 0) {
      alq.estado = "rechazado";
      this.openSnackBar("Se ha rechazado el pedido", "Ok")
    }else{
      alq.estado = "aprobado";
      this.openSnackBar("Se ha aprobado el pedido", "Ok")
    }
    this.alquilerServ.putAlquiler(String(alq.id), alq).subscribe((data) => {
      
      this.alquilerServ.getRevision().subscribe((data) => {
        this.alquileresPendientes = data;
      });
    })
  }
  verificar(id: number) {
    let aux = String(id);
    this.alquilerServ.verificarAlquiler(aux).subscribe((data) => {
      console.log(data)
      //encontramos en la lista el pedido con el id
      let index = this.alquileresPendientes.findIndex(
        (pedido) => pedido.id == id
      );
      this.alquileresPendientes[index].verified = data.estado;
     this.openSnackBar(data.message, "Ok")
    });
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openDialogDetalle(alquiler: Alquiler): void {
    console.log(alquiler);
    this.matDialog.open(PopUpHomeVendedorComponent, {
      width: '500px',
      data: { alquiler },
    });
  }
}
