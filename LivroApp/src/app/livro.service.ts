import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './livro';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class LivroService {

 url = 'http://localhost:64717/api/livros';

 constructor(private http: HttpClient) { }


 getAllLivro(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.url + '/todos');
  }

  getLivroById(livroid: string): Observable<Livro> {
    const apiurl = `${this.url}/${livroid}`;
    return this.http.get<Livro>(apiurl);
  }

  createLivro(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.url + '/incluir', livro, httpOptions);
  }

  updateLivro(livroid: string, livro: Livro): Observable<Livro> {
    const apiurl = this.url+ '/alterar?id=' + livroid ;
    return this.http.put<Livro>(apiurl,livro, httpOptions);
  }

  deleteLivroById(livroid: string): Observable<number> {
    return this.http.delete<number>(this.url + '/excluir?id=' + livroid,httpOptions);
  }

}
