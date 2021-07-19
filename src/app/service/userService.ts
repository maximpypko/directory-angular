import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../api';
// import { UserDetails } from '../models/userDetails';
import { registeredUser } from '../models/registeredUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getUsers(page: number): Observable<any>{
    return this.http.get(Api.URL + '/users?page=' + page)
  }

  getUserById(id:string):Observable<any>{
    return this.http.get(Api.URL + '/users/' + id)
  }

  // AddUser(user:UserDetails):Observable<any>{
  //   return this.http.post(Api.URL + '/users', user)
  // }
  
  registerUser(body:registeredUser):Observable<any>{
    return this.http.post(Api.URL + '/users/', body, Api.headers);
  }

  editUserById(body: registeredUser, id:string): Observable<any>{
    return this.http.patch(Api.URL + '/users/' + id, body, Api.headers);
  }

  deleteUserById(id: string): Observable<any>{
    return this.http.delete(Api.URL + '/users/' + id, Api.headers);
  }
}