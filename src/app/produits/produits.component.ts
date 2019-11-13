import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../apis/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {

  constructor(private api : ProduitService) { }
  categories = ["Eyes" , "Lips" , "Screen"];
  produits ;
  produits2
  ngOnInit() {
   /* this.api.getAll()
    .subscribe(resultat=>{
     this.produits = resultat
     this.produits2=this.produits

    })*/

    this.produits = this.api.getAll();
    this.produits2 = this.produits
   

  }
  filtre_categorie(value){
   // alert(value)
   this.produits2 = this.produits.filter((o)=> o.categorie == value);
  }
  filtre_ordre(value){
    //alert(value)
    if(value=="asc"){
      this.produits2 = this.produits.sort((a : any , b : any)=> a.prix > b.prix ? 0 : -1)
    }
    if(value=="desc"){
      this.produits2 = this.produits.sort((a : any , b : any)=> a.prix < b.prix ? 0 : -1)
    }
  }

}
