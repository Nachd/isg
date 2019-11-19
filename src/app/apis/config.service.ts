import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly hostname = 'http://127.0.0.1:5000'
  constructor() { }
}
