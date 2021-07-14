  
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Api } from "../api";
import { Login } from "../models/login";

@Injectable({
  providedIn: 'root'
})
export class LoginRequest {

  constructor(
    private http: HttpClient
  ) { }

  public login(body: Login): Observable<any> {
    return this.http.post(Api.URL + "/register", body, Api.headers);
  } 
}