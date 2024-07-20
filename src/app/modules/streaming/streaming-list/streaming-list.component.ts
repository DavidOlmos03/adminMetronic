import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenresService } from '../../genres/service/genres.service';
import { StreamingService } from '../service/streaming.service';
import { StreamingDeleteComponent } from '../streaming-delete/streaming-delete.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-streaming-list',
  templateUrl: './streaming-list.component.html',
  styleUrls: ['./streaming-list.component.scss']
})
export class StreamingListComponent {
  search:any = null;
  state:any = null;
  STREAMINGS:any = [];

  isLoading:any;  // Esto solo aplica para cuando trabajo con metronic, sin esto no carga los datos en la plataforma, a pesar de traerlos bien del backend
  constructor(
    // Para utilizar las ventanas emergentes de registro
    public modalService:NgbModal,
    // Servicios de los Generos
    public streamingService: StreamingService,
    public router: Router
  ){

  }
  ngOnInit(){
    this.listStreamings();
    this.isLoading = this.streamingService.isLoading$;   // Necesario hacerlo para relacionar el isLoading con el componente donde lo estoy utilizando
                                                    // Además en el HTML debo aplicar <span class="spinner-border spinner-border-sm align-middle ms-2" *ngIf="isLoading | async"></span>
  }
  getType(type:any){
    let value = ""
    type = parseInt(type)
    switch(type){
      case 1:
        value = "MOVIE"
        break;
      case 2:
        value = "TV SHOW"
        break;
      case 3:
        value = "VIDEO"
        break;
    }
    return value;
  }
  listStreamings (){
    // console.log("Desde genres-list" + this.GENRES)
    this.streamingService.listStreamings(this.search,this.state).subscribe((resp:any) => {
      console.log(resp.streamings.data)
      // en resp.genres.data se quita el .data porque a diferencia de users, aquí no estamos utilizando una collection
      this.STREAMINGS =  resp.streamings.data;
    })
  }

  editStreaming(STREAMING:any){
    this.router.navigateByUrl("/streamings/lista/editar/"+STREAMING.id)
  }
  deleteStreaming(STREAMING:any){
    const modalRef = this.modalService.open(StreamingDeleteComponent,{centered:true, size:'md'});
    modalRef.componentInstance.GENRE = STREAMING;

    modalRef.componentInstance.GenreD.subscribe((Genre:any)=>{  // Aqui utilizo el GenreD que se definio con el @OutPut en GenreDeleteComponent

      let index = this.STREAMINGS.findIndex((item:any) => item.id == STREAMING.id);
      if (index != -1) {
        this.STREAMINGS.splice(index,1);
      }
    })
  }
}
