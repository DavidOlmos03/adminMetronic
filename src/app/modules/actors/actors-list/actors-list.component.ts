import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActorsAddComponent } from '../actors-add/actors-add.component';
import { ActorsDeleteComponent } from '../actors-delete/actors-delete.component';
import { ActorsEditComponent } from '../actors-edit/actors-edit.component';
import { ActorsService } from '../service/actors.service';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss']
})
export class ActorsListComponent {
  search:any = null;
  state:any = null;
  ACTORS:any = [];

  isLoading:any;  // Esto solo aplica para cuando trabajo con metronic, sin esto no carga los datos en la plataforma, a pesar de traerlos bien del backend
  constructor(
    // Para utilizar las ventanas emergentes de registro
    public modalService:NgbModal,
    // Servicios de los Generos
    public actorService: ActorsService,
  ){

  }
  ngOnInit(){
    this.listActors();
    this.isLoading = this.actorService.isLoading$;   // Necesario hacerlo para relacionar el isLoading con el componente donde lo estoy utilizando
                                                    // Además en el HTML debo aplicar <span class="spinner-border spinner-border-sm align-middle ms-2" *ngIf="isLoading | async"></span>
  }
  getType(type:any){
    let value = ""
    type = parseInt(type)
    switch(type){
      case 1:
        value = "DIRECTOR"
        break;
      case 2:
        value = "ACTOR"
        break;
    }
    return value;
  }
  listActors (){
    // console.log("Desde actors-list" + this.ACTORS)
    this.actorService.listActors(this.search,this.state).subscribe((resp:any) => {
      console.log(resp.actors)
      // en resp.actors.data se quita el .data porque a diferencia de users, aquí no estamos utilizando una collection
      this.ACTORS =  resp.actors;
    })
  }
  registerActor(){
    const modalRef = this.modalService.open(ActorsAddComponent,{centered:true, size:'md'});

    modalRef.componentInstance.ActorC.subscribe((Actor:any)=>{  // Aqui utilizo el ActorC que se definio con el @OutPut en ActorAddComponent
      this.ACTORS.unshift(Actor)
    })
  }
  editActor(ACTOR:any){
    const modalRef = this.modalService.open(ActorsEditComponent,{centered:true, size:'md'});
    // Aqui paso a esa ventana modal de edición el ACTOR
    modalRef.componentInstance.ACTOR = ACTOR;

    modalRef.componentInstance.ActorE.subscribe((Actor:any)=>{  // Aqui utilizo el ActorC que se definio con el @OutPut en ActorEditComponent
      // this.ACTORS.unshift(Actor)
      let index = this.ACTORS.findIndex((item:any) => item.id == Actor.id);
      if (index != -1) {
        this.ACTORS[index] = Actor;
      }
    })
  }
  deleteActor(ACTOR:any){
    const modalRef = this.modalService.open(ActorsDeleteComponent ,{centered:true, size:'md'});
    modalRef.componentInstance.ACTOR = ACTOR;

    modalRef.componentInstance.ActorD.subscribe((Actor:any)=>{  // Aqui utilizo el ActorD que se definio con el @OutPut en ActorDeleteComponent

      let index = this.ACTORS.findIndex((item:any) => item.id == ACTOR.id);
      if (index != -1) {
        this.ACTORS.splice(index,1);
      }
    })
  }
}
