import { Component } from '@angular/core';

@Component({
  selector: 'app-streaming-add',
  templateUrl: './streaming-add.component.html',
  styleUrls: ['./streaming-add.component.scss']
})
export class StreamingAddComponent {
  title:any = ""
  subtitle:any = ""
  description:any = ""


  constructor(){

  }

  ngOnInit():void {}

  processFile($event:any){}
}
