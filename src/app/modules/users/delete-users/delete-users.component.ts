import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss']
})
export class DeleteUsersComponent {

  @Input() USER:any;   //Para enviar información del padre-hijo
  @Output() UserD: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)

  constructor(
    public modal:NgbActiveModal,
    public toastr: ToastrService,
    public UserService: UsersService
  ){}

  close(){
    this.modal.close()
  }

  delete(){
    this.UserService.deleteUser(this.USER.id).subscribe((resp:any)=>{
      this.UserD.emit("");
      this.toastr.warning("EL USUARIO SE ELIMINÓ CORRECTAMENTE",'VALIDACIÓN')
      this.close()
    })
  }
}
