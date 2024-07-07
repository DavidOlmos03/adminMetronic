import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagsService } from '../service/tags.service';
import { TagsEditComponent } from './../tags-edit/tags-edit.component';
import { TagsDeleteComponent } from './../tags-delete/tags-delete.component';
import { TagsAddComponent } from './../tags-add/tags-add.component';


@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent {
  search:any = null;
  state:any = null;
  TAGS:any = [];

  isLoading:any;  // Esto solo aplica para cuando trabajo con metronic, sin esto no carga los datos en la plataforma, a pesar de traerlos bien del backend
  constructor(
    // Para utilizar las ventanas emergentes de registro
    public modalService:NgbModal,
    // Servicios de los Generos
    public tagService: TagsService,
  ){

  }
  ngOnInit(){
    this.listTags();
    this.isLoading = this.tagService.isLoading$;   // Necesario hacerlo para relacionar el isLoading con el componente donde lo estoy utilizando
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
  listTags (){
    // console.log("Desde genres-list" + this.GENRES)
    this.tagService.listTags(this.search,this.state).subscribe((resp:any) => {
      // console.log(resp.genres)
      // en resp.genres.data se quita el .data porque a diferencia de users, aquí no estamos utilizando una collection
      this.TAGS =  resp.tags;
    })
  }
  registerTag(){
    const modalRef = this.modalService.open(TagsAddComponent,{centered:true, size:'md'});

    modalRef.componentInstance.TagC.subscribe((Tag:any)=>{  // Aqui utilizo el GenreC que se definio con el @OutPut en GenreAddComponent
      this.TAGS.unshift(Tag)
    })
  }
  editTag(TAG:any){
    const modalRef = this.modalService.open(TagsEditComponent,{centered:true, size:'md'});
    // Aqui paso a esa ventana modal de edición el TAG
    modalRef.componentInstance.TAG = TAG;

    modalRef.componentInstance.TagE.subscribe((Tag:any)=>{  // Aqui utilizo el TagC que se definio con el @OutPut en TagEditComponent
      // this.TagS.unshift(Tag)
      let index = this.TAGS.findIndex((item:any) => item.id == Tag.id);
      if (index != -1) {
        this.TAGS[index] = Tag;
      }
    })
  }
  deleteTag(TAG:any){
    const modalRef = this.modalService.open(TagsDeleteComponent ,{centered:true, size:'md'});
    modalRef.componentInstance.TAG = TAG;

    modalRef.componentInstance.TagD.subscribe((Tag:any)=>{  // Aqui utilizo el GenreD que se definio con el @OutPut en GenreDeleteComponent
      // Se encuentra la ubicación
      let index = this.TAGS.findIndex((item:any) => item.id == TAG.id);
      if (index != -1) {
        // En base a la ubicación en contrada se elimina del frontend
        this.TAGS.splice(index,1);
      }
    })
  }
}
