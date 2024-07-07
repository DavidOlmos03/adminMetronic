import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TagsService } from '../service/tags.service';

@Component({
  selector: 'app-tags-edit',
  templateUrl: './tags-edit.component.html',
  styleUrls: ['./tags-edit.component.scss']
})
export class TagsEditComponent {
// En el componente padre genre-list se recibira esta respuesta
@Input() TAG:any;
@Output() TagE: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)
title:string = ''
type:string = '1'
state:number = 1

constructor(
  public modal:NgbActiveModal,
  public toastr: ToastrService,
  public TagService: TagsService
){

}

ngOnInit():void{
 this.title = this.TAG.title;
 this.type = this.TAG.type;
 this.state = this.TAG.state;
}

close(){
  this.modal.close()
}
save(){

  if (!this.title ) {
    this.toastr.error('NECESITAS INGRESAR TODOS LOS CAMPOS','VALIDACIÓN')
    return
  }

  let data = {
    title : this.title,
    type : this.type,
    state : this.state.toString()
  }

  this.TagService.editTag(this.TAG.id,data).subscribe((resp:any)=>{
    // console.log(resp)
    if (resp.message == 403) {
      this.toastr.error(resp.message_text, 'MENSAJE DE VALIDACIÓN');
      return;
    }else{
      this.TagE.emit(resp.tag)
      this.toastr.success("EL TAG SE EDITÓ CORRECTAMENTE",'VALIDACIÓN')
      this.modal.close()
    }
  })
}
}
