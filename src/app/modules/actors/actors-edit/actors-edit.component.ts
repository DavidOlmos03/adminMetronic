import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActorsService } from '../service/actors.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actors-edit',
  templateUrl: './actors-edit.component.html',
  styleUrls: ['./actors-edit.component.scss']
})
export class ActorsEditComponent {
 // En el componente padre genre-list se recibira esta respuesta
 @Input() ACTOR:any;
 @Output() ActorE: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)
 full_name:string = ''
 profession:string = ''
 type:string = '1'
 state:string = '1'

 IMAGEN_PREVISUALIZACION:any = './assets/media/avatars/300-15.jpg'
 IMAGEN_FILE:any = null


 constructor(
   public modal:NgbActiveModal,
   public toastr: ToastrService,
   public ActorService: ActorsService
 ){

 }

 ngOnInit():void{
  this.full_name = this.ACTOR.full_name;
  this.profession = this.ACTOR.profession;
  this.type = this.ACTOR.type;
  this.state = this.ACTOR.state+"";
  this.IMAGEN_PREVISUALIZACION = this.ACTOR.imagen;
 }

 close(){
   this.modal.close()
 }
 save(){

   if (!this.full_name || !this.profession) {
     this.toastr.error('NECESITAS INGRESAR TODOS LOS CAMPOS','VALIDACIÓN')
     return
   }


   let formData = new FormData();
   if (this.IMAGEN_FILE) {
     formData.append("img",this.IMAGEN_FILE)
   }
   formData.append("full_name",this.full_name)
   formData.append("profession",this.profession)
   formData.append("type",this.type)
   formData.append("state",this.state.toString())   // Esto deberia arreglar el problema de que no aparezca el state inmediatamente se cree o edite el genero (agrega un genero por defecto)


   this.ActorService.editActor(this.ACTOR.id,formData).subscribe((resp:any)=>{
     // console.log(resp)
     if (resp.message == 403) {
       this.toastr.error(resp.message_text, 'MENSAJE DE VALIDACIÓN');
       return;
     }else{
       this.ActorE.emit(resp.actor)
       this.toastr.success("EL ACTOR SE EDITÓ CORRECTAMENTE",'VALIDACIÓN')
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
