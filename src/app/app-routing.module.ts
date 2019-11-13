import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ProduitsComponent } from './produits/produits.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';


const routes: Routes = [
 
  {
    path : 'login',
    component : LoginComponent
  }
  ,{
    path : '',
    component : LayoutComponent,
    children : [
      {
        path : 'todo',
        component : TodoComponent
      },
      {
        path : 'produits',
        component : ProduitsComponent
      },
      {
        path : 'details/:ref',
        component : DetailProduitComponent
      },{
        path : 'ajout',
        component : AjoutProduitComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
