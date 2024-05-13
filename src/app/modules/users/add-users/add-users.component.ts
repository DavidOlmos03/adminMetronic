import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService   } from 'ngx-toastr';
import { UsersService } from '../service/users.service';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {
  name:string = ''
  surname:string = ''
  email:string = ''
  password:string = ''
  repit_password:string = ''
  role_id:number = 1

  IMAGEN_PREVISUALIZACION:any = './assets/media/avatars/300-6.jpg'
  IMAGEN_FILE:any = null


  constructor(
    public modal:NgbActiveModal,
    public toastr: ToastrService,
    public UserService: UsersService
  ){

  }
  close(){
    this.modal.close()
  }
  save(){

    if (!this.IMAGEN_FILE || !this.name || !this.surname || !this.email || !this.password || !this.role_id) {
      this.toastr.error('NECESITAS INGRESAR TODOS LOS CAMPOS','VALIDACIÓN')
      return
    }

    if (this.password != this.repit_password) {
      this.toastr.error('LAS CONTRASEÑAS DEBEN SER IGUALES','VALIDACIÓN')
      return
    }

    let formData = new FormData();
    formData.append("img",this.IMAGEN_FILE)
    formData.append("name",this.name)
    formData.append("surname",this.surname)
    formData.append("email",this.email)
    formData.append("password",this.password)
    formData.append("role_id",this.role_id + "")

    this.UserService.registerUser(formData).subscribe((resp:any)=>{
      console.log(resp)
      if (resp.message == 403) {
        this.toastr.error(resp.message_text, 'MENSAJE DE VALIDACIÓN');
        return;
      }else{
        this.toastr.success("EL USUARIO SE REGISTRÓ CORRECTAMENTE",'VALIDACIÓN')
      }
    })
  }
  processAvatar($event:any){
    if ($event.target.files[0].type.indexOf("image")<0) {
      this.toastr.error('EL ARCHIVO NO ES UNA IMAGEN', 'MENSAJE DE VALIDACIÓN');
      return;
    }
    this.IMAGEN_FILE = $event.target.files[0];
    let reader = new FileReader()
    reader.readAsDataURL(this.IMAGEN_FILE)
    reader.onloadend = () => this.IMAGEN_PREVISUALIZACION = reader.result;
  }
}
