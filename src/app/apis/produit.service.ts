import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get('http://localhost:4200/assets/products.json')
  }
}
