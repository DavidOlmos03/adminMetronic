import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  // Parametros que solicita metronic son la busqueda y el estatus
  listGenres(search:any=null, state:any=null){
    console.log("Desde genres service "+search+" "+state)
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let LINK = '?t='
    if (search) {
      LINK += "&search="+search
    }
    if (state) {
      LINK += "&state="+state
    }
    let URL = URL_SERVICIOS + "/genres" + LINK
    console.log(URL)
    return this.http.get(URL,{headers:Headers}).pipe(
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }
  registerGenre(data:any){
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let URL = URL_SERVICIOS + "/genres"
    return this.http.post(URL,data,{headers:Headers}).pipe(
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }
  editGenre(genre_id:any, data:any){
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let URL = URL_SERVICIOS + "/genres/"+genre_id
    return this.http.post(URL,data,{headers:Headers}).pipe(   //No se utiliza put o patch pues estas no me permiten enviar imagenes de manera adecuada, cosa que se estara haciendo
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }
  deleteGenre(genre_id:any){
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let URL = URL_SERVICIOS + "/genres/" + genre_id
    return this.http.delete(URL,{headers:Headers}).pipe(
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }
}
