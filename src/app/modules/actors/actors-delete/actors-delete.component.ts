import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActorsService } from '../service/actors.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actors-delete',
  templateUrl: './actors-delete.component.html',
  styleUrls: ['./actors-delete.component.scss']
})
export class ActorsDeleteComponent {
  @Input() ACTOR:any;   //Para enviar información del padre-hijo
  @Output() ActorD: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)

  constructor(
    public modal:NgbActiveModal,
    public toastr: ToastrService,
    public ActorService: ActorsService
  ){}

  close(){
    this.modal.close()
  }

  delete(){
    this.ActorService.deleteActor(this.ACTOR.id).subscribe((resp:any)=>{
      this.ActorD.emit("");
      this.toastr.warning("EL ACTOR SE ELIMINÓ CORRECTAMENTE",'VALIDACIÓN')
      this.close()
    })
  }
}
