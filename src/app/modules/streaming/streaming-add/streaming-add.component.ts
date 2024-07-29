import { Component } from '@angular/core';
import { StreamingService } from '../service/streaming.service';
import { GenresAddComponent } from '../../genres/genres-add/genres-add.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-streaming-add',
  templateUrl: './streaming-add.component.html',
  styleUrls: ['./streaming-add.component.scss']
})
export class StreamingAddComponent {
  title:any = ""
  subtitle:any = ""
  description:any = ""

  IMAGEN_FILE:any
  IMAGEN_PREVISUALIZA:any

  genre_id:any = ""
  tags_selected:any = []
  actors_selected:any = []
  type:any = 1


  TAGS:any = []
  GENRES:any = []
  ACTORS:any = []
  isLoading:any


  selected_tag:any
  selected_actor:any


  constructor(
    public StreamingService: StreamingService,
    public toaster: ToastrService
  ){

  }


  ngOnInit():void {
    this.isLoading = this.StreamingService.isLoading$;
    this.StreamingService.configAll().subscribe((resp:any) => {
      // console.log(resp.tags[0].title)
      this.TAGS = resp.tags
      this.GENRES = resp.genres
      this.ACTORS = resp.actors
    })
  }


  addTags(){
    if (this.selected_tag) {
      let INDEX = this.tags_selected.findIndex((item:any) => item.id == this.selected_tag);
      if(INDEX != -1){
        this.toaster.warning('EL TAG SELECCIONADO YA EXISTE EN LA LISTA')
        return
      }else{
        let TAG_S = this.TAGS.find((item:any) => item.id == this.selected_tag)
        this.tags_selected.unshift(TAG_S)
        this.selected_tag = null
      }
    }else{
      this.toaster.warning('NECESITAS SELECCIONAR UN TAG')
      return
    }
  }
  addActors(){
    if (this.selected_actor) {
      let INDEX = this.actors_selected.findIndex((item:any) => item.id == this.selected_actor);
      if(INDEX != -1){
        this.toaster.warning('EL ACTOR SELECCIONADO YA EXISTE EN LA LISTA')
        return
      }else{
        let ACTOR_S = this.ACTORS.find((item:any) => item.id == this.selected_actor)
        this.actors_selected.unshift(ACTOR_S)
        this.selected_actor = null
      }
    }else{
      this.toaster.warning('NECESITAS SELECCIONAR UN ACTOR')
      return
    }
  }

  processFile($event:any){
    if ($event.target.files[0].type.indexOf("image")<0) {
      this.toaster.error('EL ARCHIVO NO ES UNA IMAGEN', 'MENSAJE DE VALIDACIÓN');
      return;
    }
    this.IMAGEN_FILE = $event.target.files[0];
    let reader = new FileReader()
    reader.readAsDataURL(this.IMAGEN_FILE)
    reader.onloadend = () => this.IMAGEN_PREVISUALIZA = reader.result;
    this.StreamingService.isLoadingSubject.next(true)
    setTimeout(()=>{
    this.StreamingService.isLoadingSubject.next(false)
    },50)
  }

  save(){
    if (!this.title || !this.description || !this.genre_id || this.tags_selected.length == 0
      || !this.subtitle || !this.IMAGEN_FILE
    ) {
        this.toaster.error('ES OBLIGATORIO LLENAR TODOS LOS CAMPOS', 'MENSAJE DE ERROR');
        return
    }
    let formData = new FormData();
    formData.append("title",this.title)
    formData.append("description",this.description)
    formData.append("genre_id",this.genre_id)
    formData.append("subtitle",this.subtitle)
    formData.append("img",this.IMAGEN_FILE)

    // Casos especiales para enviar
    let TAGST:any = []
    // Como tenemos un array de objetos, entonces como solo necesito agregar el titulo por eso hago esta "extracción"
    this.tags_selected.forEach((tg:any)=>{
      TAGST.push(tg.title)
    })
    // Despues de lo anterior obtengo y luego -> en el backend
    // ["SUSPENSO","TERROR","COMEDIA"] -> "SUSPENSO","TERROR","COMEDIA"
    formData.append("tags",TAGST)
    formData.append("type",this.type)
    // JSON.stringify transforma el objeto a un formato string que pueda interpretar
    formData.append("actors_selected",JSON.stringify(this.actors_selected))

    this.StreamingService.registerStreaming(formData).subscribe((resp:any)=>{
      console.log(resp)
      console.log(resp.mesasge)
      if (resp.message == 403) {
        this.toaster.warning(resp.message_text, 'MENSAJE DE ERROR');
        return
      } else {
        this.toaster.success("EL STREAMING SE REGISTRÓ CORRECTAMENTE", 'MENSAJE DE EXITO');

      }
    })
  }
}
