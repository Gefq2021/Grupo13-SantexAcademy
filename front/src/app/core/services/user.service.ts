import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private previousUrl: string = '/'; // Valor predeterminado como página de inicio

  constructor(private _http: ApiService) { }
  login(data: any): Observable<any>{
    return this._http.post('http://localhost:4001/user/login',data);
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  logout() {
     localStorage.removeItem('user');
  }

  setPreviousUrl(url: string): void {
    this.previousUrl = url;
  }

  getPreviousUrl(): string {
    return this.previousUrl;
  }

}
