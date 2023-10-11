import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Observable, map } from 'rxjs';
import { AlquilerService } from 'src/app/core/services/alquiler.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {
  
  productList: Product[] = new Array<Product>();
  p!:Product 
  startDate!:Date
  endDate!:Date
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private shoppingCartService: ShoppingCartService, private alquilerService:AlquilerService,
    private _snackBar: MatSnackBar) { 
    
  }

  // Método para calcular el total de los precios
  totalPrice: number = 0;
  
  // Función para vaciar el carrito
  emptyCart(): void {
    this.shoppingCartService.clearCart().subscribe();
    this.productList = [];
  }


  ngOnInit(): void {
    this.shoppingCartService.obtenerCarrito("1").subscribe(data =>
      {
       let lista = data[0].Products;
       lista.forEach((e: any) => {
        this.totalPrice = this.totalPrice + e.price
         this.p = e
         this.productList.push(this.p);
       })
     })     
  }
  registrarPedido(): void {
    let user =JSON.parse(localStorage.getItem("user")!);
    let body = {
      "productos": this.productList,
      "fechaInicio": this.range.value.start,
      "fechaFin": this.range.value.end,
      "solicitadoPor": user.id,
      "precioFinal": this.totalPrice
    }
    this.alquilerService.postAlquiler(body).subscribe(
      cres=>{
        console.log(cres)
        this.openSnackBar(cres.msg, "Ok")
      }
    );
    this.emptyCart()
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
