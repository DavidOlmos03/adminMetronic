import { Component } from '@angular/core';
import { StreamingService } from '../service/streaming.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-streaming-edit',
  templateUrl: './streaming-edit.component.html',
  styleUrls: ['./streaming-edit.component.scss']
})
export class StreamingEditComponent {
  streaming_selected:any = null
  title:any = ""
  subtitle:any = ""
  description:any = ""

  IMAGEN_FILE:any
  IMAGEN_PREVISUALIZA:any
  VIDEO_TRAILER:any
  genre_id:any = ""
  tags_selected:any = []
  actors_selected:any = []
  type:any = 1
  state:any = 1

  TAGS:any = []
  GENRES:any = []
  ACTORS:any = []
  isLoading:any


  selected_tag:any
  selected_actor:any

  streaming_id:any = null
  constructor(
    public StreamingService: StreamingService,
    public toaster: ToastrService,
    public activateRoute: ActivatedRoute,
    public router: Router
  ){

  }


  ngOnInit():void {
    this.isLoading = this.StreamingService.isLoading$;
    this.activateRoute.params.subscribe((resp:any)=> {
      this.streaming_id = resp.id
    })
    this.StreamingService.configAll().subscribe((resp:any) => {
      // console.log(resp.tags[0].title)
      this.TAGS = resp.tags
      this.GENRES = resp.genres
      this.ACTORS = resp.actors
      this.showStreaming();

    })
  }

  showStreaming(){
    this.StreamingService.showStreaming(this.streaming_id).subscribe((resp:any)=>{
      if (resp.message == 404) {
        this.toaster.error('EL STREAMING NO EXISTE')
        this.router.navigateByUrl("/streamings/lista")
      }
      this.streaming_selected = resp.streaming
      this.title = this.streaming_selected.title
      this.subtitle = this.streaming_selected.subtitle
      this.genre_id = this.streaming_selected.genre_id
      this.description = this.streaming_selected.description
      this.IMAGEN_PREVISUALIZA = this.streaming_selected.imagen
      this.type = this.streaming_selected.type

      this.tags_selected = this.streaming_selected.tags_multiple;
      this.actors_selected = this.streaming_selected.actors;
      this.state = this.streaming_selected.state
    })
  }

  addTags(){
    console.log("tags_selected 1:",this.tags_selected)
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

  deleteTag(i:any){
    console.log(i)
    this.tags_selected.splice(i,1)
  //  let INDEX_TAG_SELECTED =  this.tags_selected.findIndex((item:any) => item.id == tags_selec.id)
  //  if(INDEX_TAG_SELECTED != -1){
  //   this.tags_selected.splice(INDEX_TAG_SELECTED,1)
  //  }
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

  deleteActor(actor_selec:any){
    console.log(actor_selec.index)
    let INDEX_ACTOR_SELECTED =  this.actors_selected.findIndex((item:any) => item.id == actor_selec.id)
    // console.log(INDEX_ACTOR_SELECTED)
    // Si el INDEX_ACTOR_SELECTED me retorna diferente de -1 significa que si existe, entonces procedo a eliminarlo de la lista
    if(INDEX_ACTOR_SELECTED != -1){
      // console.log(actor_selec)
      this.actors_selected.splice(INDEX_ACTOR_SELECTED,1)
    }
    // console.log(actor_selec)
  }
  processFileVideo($event:any){
    if ($event.target.files[0].type.indexOf("video")<0) {
      this.toaster.error('EL ARCHIVO NO ES UN VIDEO', 'MENSAJE DE VALIDACIÓN');
      return;
    }
    this.VIDEO_TRAILER = $event.target.files[0];
    // let reader = new FileReader()
    // reader.readAsDataURL(this.IMAGEN_FILE)
    // reader.onloadend = () => this.IMAGEN_PREVISUALIZA = reader.result;
    // this.StreamingService.isLoadingSubject.next(true)
    // setTimeout(()=>{
    // this.StreamingService.isLoadingSubject.next(false)
    // },50)
  }
  uploadVideo(){}
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
      || !this.subtitle
    ) {
        this.toaster.error('ES OBLIGATORIO LLENAR TODOS LOS CAMPOS', 'MENSAJE DE ERROR');
        return
    }
    let formData = new FormData();
    formData.append("title",this.title)
    formData.append("description",this.description)
    formData.append("genre_id",this.genre_id)
    formData.append("subtitle",this.subtitle)
    formData.append("state",this.state)
    if (this.IMAGEN_FILE) {
      formData.append("img",this.IMAGEN_FILE)
    }

    // Casos especiales para enviar
    let TAGST:any = []
    // Como tenemos un array de objetos, entonces como solo necesito agregar el titulo por eso hago esta "extracción"
    this.tags_selected.forEach((tg:any)=>{
      TAGST.push(tg.title)
    })
    // Despues de lo anterior obtengo y luego -> en el backend
    // ["SUSPENSO","TERROR","COMEDIA"] -> "SUSPENSO","TERROR","COMEDIA"
    formData.append("tags",TAGST)
    // JSON.stringify transforma el objeto a un formato string que pueda interpretar
    formData.append("actors_selected",JSON.stringify(this.actors_selected))

    this.StreamingService.editStreaming(this.streaming_selected.id, formData).subscribe((resp:any)=>{
      console.log(resp)
      console.log(resp.mesasge)
      if (resp.message == 403) {
        this.toaster.warning(resp.message_text, 'MENSAJE DE ERROR');
        return
      } else {
        this.toaster.success("EL STREAMING SE EDITO CORRECTAMENTE", 'MENSAJE DE EXITO');

      }
    })
  }
}
