import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenresService } from '../service/genres.service';
import { GenresEditComponent } from '../genres-edit/genres-edit.component';
import { GenresDeleteComponent } from './../genres-delete/genres-delete.component';
import { GenresAddComponent } from './../genres-add/genres-add.component';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss']
})
export class GenresListComponent {

  search:any = null;
  state:any = null;
  GENRES:any = [];

  isLoading:any;  // Esto solo aplica para cuando trabajo con metronic, sin esto no carga los datos en la plataforma, a pesar de traerlos bien del backend
  constructor(
    // Para utilizar las ventanas emergentes de registro
    public modalService:NgbModal,
    // Servicios de los Generos
    public genreService: GenresService,
  ){

  }
  ngOnInit(){
    this.listGenres();
    this.isLoading = this.genreService.isLoading$;   // Necesario hacerlo para relacionar el isLoading con el componente donde lo estoy utilizando
                                                    // Además en el HTML debo aplicar <span class="spinner-border spinner-border-sm align-middle ms-2" *ngIf="isLoading | async"></span>
  }
  listGenres (){
    // console.log("Desde genres-list" + this.GENRES)
    this.genreService.listGenres(this.search,this.state).subscribe((resp:any) => {
      // console.log(resp.genres)
      // en resp.genres.data se quita el .data porque a diferencia de users, aquí no estamos utilizando una collection
      this.GENRES =  resp.genres;
    })
  }
  registerGenre(){
    const modalRef = this.modalService.open(GenresAddComponent,{centered:true, size:'md'});

    modalRef.componentInstance.GenreC.subscribe((Genre:any)=>{  // Aqui utilizo el GenreC que se definio con el @OutPut en GenreAddComponent
      this.GENRES.unshift(Genre)
    })
  }
  editGenre(GENRE:any){
    const modalRef = this.modalService.open(GenresEditComponent,{centered:true, size:'md'});
    modalRef.componentInstance.GENRE = GENRE;

    modalRef.componentInstance.GenreE.subscribe((Genre:any)=>{  // Aqui utilizo el GenreC que se definio con el @OutPut en GenreEditComponent
      // this.GENRES.unshift(Genre)
      let index = this.GENRES.findIndex((item:any) => item.id == Genre.id);
      if (index != -1) {
        this.GENRES[index] = Genre;
      }
    })
  }
  deleteGenre(GENRE:any){
    const modalRef = this.modalService.open(GenresDeleteComponent ,{centered:true, size:'md'});
    modalRef.componentInstance.GENRE = GENRE;

    modalRef.componentInstance.GenreD.subscribe((Genre:any)=>{  // Aqui utilizo el GenreD que se definio con el @OutPut en GenreDeleteComponent

      let index = this.GENRES.findIndex((item:any) => item.id == GENRE.id);
      if (index != -1) {
        this.GENRES.splice(index,1);
      }
    })
  }
}
