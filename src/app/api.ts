import { HttpHeaders } from "@angular/common/http";

export class Api {
  public static URL = "https://reqres.in/api";

  public static headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
}