import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingComponent } from './streaming.component';
import { StreamingAddComponent } from './streaming-add/streaming-add.component';
import { StreamingEditComponent } from './streaming-edit/streaming-edit.component';
import { StreamingDeleteComponent } from './streaming-delete/streaming-delete.component';
import { StreamingListComponent } from './streaming-list/streaming-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    StreamingComponent,
    StreamingAddComponent,
    StreamingEditComponent,
    StreamingDeleteComponent,
    StreamingListComponent
  ],
  imports: [
    CommonModule,
    StreamingRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,

  ]
})
export class StreamingModule { }
