import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ApiService {
  apiLink = 'http://team-scale.com/TestData/ng_text_v15/api'
  constructor( private _http: HttpClient ) { }

public fetchData(){
  return this._http.get(this.apiLink);
}

}