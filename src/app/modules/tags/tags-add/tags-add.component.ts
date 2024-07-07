import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TagsService } from '../service/tags.service';

@Component({
  selector: 'app-tags-add',
  templateUrl: './tags-add.component.html',
  styleUrls: ['./tags-add.component.scss']
})
export class TagsAddComponent {
// En el componente padre tags-list se recibira esta respuesta
@Output() TagC: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)
title:string = ''
type:string = '1'

constructor(
  public modal:NgbActiveModal,
  public toastr: ToastrService,
  public TagService: TagsService
){

}
close(){
  this.modal.close()
}
save(){

  if (!this.title) {
    this.toastr.error('NECESITAS INGRESAR TODOS LOS CAMPOS','VALIDACIÓN')
    return
  }

  // En este caso como no vamos a enviar imagen, podemos tener todo dentro de una variable llamda data
  let data = {
    title: this.title,
    type: this.type,
    state: 1
  }

  this.TagService.registerTag(data).subscribe((resp:any)=>{
    // console.log(resp)
    if (resp.message == 403) {
      this.toastr.error(resp.message_text, 'MENSAJE DE VALIDACIÓN');
      return;
    }else{
      this.TagC.emit(resp.tag)
      this.toastr.success("EL TAG SE REGISTRÓ CORRECTAMENTE",'VALIDACIÓN')
      this.modal.close()
    }
  })
}
}
