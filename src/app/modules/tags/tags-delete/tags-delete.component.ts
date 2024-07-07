import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TagsService } from '../service/tags.service';

@Component({
  selector: 'app-tags-delete',
  templateUrl: './tags-delete.component.html',
  styleUrls: ['./tags-delete.component.scss']
})
export class TagsDeleteComponent {
  @Input() TAG:any;   //Para enviar información del padre-hijo
  @Output() TagD: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)

  constructor(
    public modal:NgbActiveModal,
    public toastr: ToastrService,
    public TagService: TagsService
  ){}

  close(){
    this.modal.close()
  }

  delete(){
    this.TagService.deleteTag(this.TAG.id).subscribe((resp:any)=>{
      this.TagD.emit("");
      this.toastr.warning("EL TAG SE ELIMINÓ CORRECTAMENTE",'VALIDACIÓN')
      this.close()
    })
  }
}
