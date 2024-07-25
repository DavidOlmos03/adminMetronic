import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listStreamings(search:any=null, state:any=null){
    // console.log("Desde genres service "+search+" "+state)
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let LINK = '?t='
    if (search) {
      LINK += "&search="+search
    }
    if (state) {
      LINK += "&state="+state
    }
    let URL = URL_SERVICIOS + "/streaming" + LINK
    console.log("desde service",URL)
    return this.http.get(URL,{headers:Headers}).pipe(
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }

  configAll(search:any=null, state:any=null){
    // console.log("Desde genres service "+search+" "+state)
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})

    let URL = URL_SERVICIOS + "/streaming/config_all"
    // console.log(URL)
    return this.http.get(URL,{headers:Headers}).pipe(
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }

  showStreaming(STREAMING_ID:string){
    // console.log("Desde genres service "+search+" "+state)
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})

    let URL = URL_SERVICIOS + "/streaming/"+STREAMING_ID
    // console.log(URL)
    return this.http.get(URL,{headers:Headers}).pipe(
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }

  registerStreaming(data:any){
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let URL = URL_SERVICIOS + "/streaming"
    return this.http.post(URL,data,{headers:Headers}).pipe(
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }
  editStreaming(streaming_id:any, data:any){
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let URL = URL_SERVICIOS + "/streaming/"+streaming_id
    return this.http.post(URL,data,{headers:Headers}).pipe(   //No se utiliza put o patch pues estas no me permiten enviar imagenes de manera adecuada, cosa que se estara haciendo
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }
  uploadVideoTrailer(streaming_id:any, data:any){
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let URL = URL_SERVICIOS + "/streaming/upload_video/"+streaming_id
    return this.http.post(URL,data,{headers:Headers}).pipe(   //No se utiliza put o patch pues estas no me permiten enviar imagenes de manera adecuada, cosa que se estara haciendo
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }
  uploadVideoContenido(streaming_id:any, data:any){
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let URL = URL_SERVICIOS + "/streaming/upload_video_contenido/"+streaming_id
    return this.http.post(URL,data,{headers:Headers}).pipe(   //No se utiliza put o patch pues estas no me permiten enviar imagenes de manera adecuada, cosa que se estara haciendo
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }
  deleteStreaming(streaming_id:any){
    this.isLoadingSubject.next(true)
    let Headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token})
    let URL = URL_SERVICIOS + "/streaming/" + streaming_id
    return this.http.delete(URL,{headers:Headers}).pipe(
      finalize(()=>{
        this.isLoadingSubject.next(false)
      })
    )
  }
}
