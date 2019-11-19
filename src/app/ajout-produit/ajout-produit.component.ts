import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProduitService } from '../apis/produit.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  constructor(private apis: ProduitService,
    private route: ActivatedRoute,
    private router: Router) { }
  categories = ["Eyes", "Lips", "Screen"];
  productForm: FormGroup;
  produit: Product = new Product();
  produits: Product[];
  exist: boolean = false;
  reference;
  isNew = true;
  ngOnInit() {
    this.reference = this.route.snapshot.params['ref'];
    if (this.reference) {
      this.isNew = false;
    }
    this.productForm = new FormGroup({
      'ref': new FormControl([Validators.required]),
      'nom': new FormControl([Validators.required]),
      'categorie': new FormControl([Validators.required]),
      'qte': new FormControl([Validators.required]),
      'description': new FormControl([Validators.required]),
      'prix': new FormControl([Validators.required]),
      'image': new FormControl()
    })
    this.apis.getAll()
      .subscribe((data: Product[]) => {
        //en cas de success try
        this.produits = data;
        if (!this.isNew) {
          this.produit = this.produits.filter((s) => s.ref == this.reference)[0]
        }
      }, err => {
        //en cas d'erreur 
      })
  }

  testRef() {
    let x = this.produits.filter((s) => s.ref == this.produit.ref)
    if (x.length > 0) {
      this.exist = true;
    } else {
      this.exist = false;
    }
  }

  save() {
    if (this.isNew) {
      this.apis.createProduct(this.produit)
        .subscribe(data => {
          console.log(data);
          Swal.fire('Saved !', 'message', 'success');
          this.router.navigate(['/produits'])
        })
    } else {
      this.apis.updateProduct(this.produit)
        .subscribe(data => {
          console.log(data);
          Swal.fire('Saved !', 'message', 'success');
          this.router.navigate(['/produits'])
        })
    }

    //Swal.fire('Saved !' , 'message' , 'success')
    /* Swal.fire({
       title : 'Are you sure ?',
       text : 'ttt',
       icon : 'warning',
       showCancelButton : true,
       confirmButtonText : 'OK',
       cancelButtonText : 'Cancel'
     }).then((result)=>{
       if(result.value){
         Swal.fire('Deleted' , '' , 'success')
       }else{
         Swal.fire('Canceled' , '' , 'error')
       }
     })*/
    console.log(this.produit)

  }

  delete() {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'ttt',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.apis.deleteProduct(this.produit._id)
          .subscribe(data => {
            Swal.fire('Deleted', '', 'success');
            this.router.navigate(['/produits'])
          })

      } else {
        Swal.fire('Canceled', '', 'error')
      }
    })
  }

  upload(e) {
    var files = e.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this.loader.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  loader(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.produit.image = 'data:image/png;base64,' + btoa(binaryString);
  }
}
