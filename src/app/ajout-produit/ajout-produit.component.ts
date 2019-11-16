import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  constructor() { }
  categories = ["Eyes" , "Lips" , "Screen"];
  productForm : FormGroup;
  ref;nom;categorie;qte;description;prix;
  ngOnInit() {
    this.productForm = new FormGroup({
      'ref': new FormControl([Validators.required]),
      'nom': new FormControl([Validators.required]),
      'categorie': new FormControl([Validators.required]),
      'qte': new FormControl([Validators.required]),
      'description': new FormControl([Validators.required]),
      'prix': new FormControl([Validators.required]),
    })
  }

}
