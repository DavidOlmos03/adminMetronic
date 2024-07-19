import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamingComponent } from './streaming.component';
import { StreamingListComponent } from './streaming-list/streaming-list.component';
import { StreamingAddComponent } from './streaming-add/streaming-add.component';
import { StreamingEditComponent } from './streaming-edit/streaming-edit.component';

const routes: Routes = [
  {
    path:'',
    component: StreamingComponent,
    children: [
      {
        path:'lista',
        component: StreamingListComponent
      },
      {
        path: 'registro',
        component: StreamingAddComponent
      },
      {
        path: 'lista/editar/:id',
        component: StreamingEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamingRoutingModule { }
