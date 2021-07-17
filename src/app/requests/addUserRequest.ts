import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Api } from "../api";
import { AddUser } from "../models/addUser";

@Injectable({
  providedIn: 'root'
})

export class addUserRequest {

  constructor(
    private http: HttpClient
  ) { }

  public login(body: AddUser): Observable<any> {
    return this.http.post(Api.URL + "/users", body, Api.headers);
  } 
}