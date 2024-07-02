import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService   } from 'ngx-toastr';
import { GenresService } from '../service/genres.service';
@Component({
  selector: 'app-genres-add',
  templateUrl: './genres-add.component.html',
  styleUrls: ['./genres-add.component.scss']
})
export class GenresAddComponent {
  // En el componente padre genre-list se recibira esta respuesta
  @Output() GenreC: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)
  title:string = ''
  type:string = '1'

  IMAGEN_PREVISUALIZACION:any = './assets/media/avatars/21.jpg'
  IMAGEN_FILE:any = null


  constructor(
    public modal:NgbActiveModal,
    public toastr: ToastrService,
    public GenreService: GenresService
  ){

  }
  close(){
    this.modal.close()
  }
  save(){

    if (!this.IMAGEN_FILE || !this.title ) {
      this.toastr.error('NECESITAS INGRESAR TODOS LOS CAMPOS','VALIDACIÓN')
      return
    }


    let formData = new FormData();
    formData.append("img",this.IMAGEN_FILE)
    formData.append("title",this.title)
    formData.append("type",this.type)
    formData.append("state",1+"")   // Esto deberia arreglar el problema de que no aparezca el state inmediatamente se cree o edite el genero (agrega un genero por defecto)

    // Iterar sobre las entradas de formData
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.GenreService.registerGenre(formData).subscribe((resp:any)=>{
      // console.log(resp)
      if (resp.message == 403) {
        this.toastr.error(resp.message_text, 'MENSAJE DE VALIDACIÓN');
        return;
      }else{
        this.GenreC.emit(resp.genre)
        this.toastr.success("EL GENERO SE REGISTRÓ CORRECTAMENTE",'VALIDACIÓN')
        this.modal.close()
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
