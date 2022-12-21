import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Receita } from '../model/receita.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  httpOptions ={
    headers: new HttpHeaders({'Content-type' : 'application/json'})
  }
  constructor(private http: HttpClient) {}

  readonly API = "http://localhost:3000/receita/";

  getReceita() {
    return this.http.get<Receita[]>(this.API);
   }
   getReceitaUnica(id: Number){
    return this.http.get<Receita>(this.API + id);
   }
   postReceita(livro: any) {
    return this.http.post(this.API, JSON.stringify(livro), this.httpOptions).subscribe();
   }
   deletaReceita(id: Number) {
    return this.http.delete(this.API + id).subscribe();
   }
   updateStatus(livro: Receita){
    return this.http.put(this.API + livro.id, JSON.stringify(livro), this.httpOptions).subscribe();
   }
   updateReceita(livro: Receita, id: any){
    return this.http.put(this.API + id, JSON.stringify(livro), this.httpOptions).subscribe();
   }
}
