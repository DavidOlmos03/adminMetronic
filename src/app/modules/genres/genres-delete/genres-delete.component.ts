import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GenresService } from '../service/genres.service';
@Component({
  selector: 'app-genres-delete',
  templateUrl: './genres-delete.component.html',
  styleUrls: ['./genres-delete.component.scss']
})
export class GenresDeleteComponent {
  @Input() GENRE:any;   //Para enviar información del padre-hijo
  @Output() GenreD: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)

  constructor(
    public modal:NgbActiveModal,
    public toastr: ToastrService,
    public GenreService: GenresService
  ){}

  close(){
    this.modal.close()
  }

  delete(){
    this.GenreService.deleteGenre(this.GENRE.id).subscribe((resp:any)=>{
      this.GenreD.emit("");
      this.toastr.warning("EL GENERO SE ELIMINÓ CORRECTAMENTE",'VALIDACIÓN')
      this.close()
    })
  }
}
