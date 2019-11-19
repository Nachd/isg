import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http : HttpClient ,
    private config : ConfigService
    ) { }

    url = this.config.hostname;
  getAll(){
    return this.http.get(this.url+'/produits')
  }
  createProduct(produit : Product){
    return this.http.post(this.url+'/produit' , produit)
  }
  updateProduct(produit : Product){
    return this.http.put(this.url+'/produit' , produit)
  }
  deleteProduct(id){
    return this.http.delete(this.url+'/produit/'+id)
  }
}
