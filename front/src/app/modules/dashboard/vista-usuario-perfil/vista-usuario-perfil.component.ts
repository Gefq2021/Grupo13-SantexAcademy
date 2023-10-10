import { Component, OnInit } from '@angular/core';
import { Alquiler } from 'src/app/core/interfaces/alquiler';
import { User } from 'src/app/core/interfaces/user';
import { AlquilerService } from 'src/app/core/services/alquiler.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-vista-usuario-perfil',
  templateUrl: './vista-usuario-perfil.component.html',
  styleUrls: ['./vista-usuario-perfil.component.css']
})
export class VistaUsuarioPerfilComponent implements OnInit {
alquileresUser!: Alquiler[]
  // Creamos una lista de productos como ejemplo


  

  //Creamos un Usuario
  perfilUsuario!:User 

  constructor(private userServ: UserService, private alquilerserv:AlquilerService ) { 
    
  }

  ngOnInit(): void {
    this.perfilUsuario = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
     this.alquilerserv.getpedidos(this.perfilUsuario.id).subscribe(
      res=>{
       this.alquileresUser = res;
       console.log(res)
       console.log(this.alquileresUser)
      }
     )
    
  }
  removeProducto(index: number){
      // Función para eliminar un producto del carrousel
    // this.productList2.splice(index, 1);

  }
  
}
