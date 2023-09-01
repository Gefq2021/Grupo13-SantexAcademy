import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FormAddProductComponent } from './form-add-product/form-add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUpdateComponent } from './form-update/form-update.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormDeleteComponent } from './form-delete/form-delete.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [DashboardPageComponent, FormAddProductComponent, FormUpdateComponent, NavBarComponent, FormDeleteComponent, HomeComponent, ShoppingCartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardPageComponent
  ],
  providers: [],
})
export class DashboardModule {}
