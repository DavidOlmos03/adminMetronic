import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../add-users/add-users.component';
import { UsersService } from '../service/users.service';
import { EditUsersComponent } from '../edit-users/edit-users.component';
import { DeleteUsersComponent } from '../delete-users/delete-users.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  search:any = null;
  state:any = null;
  USERS:any = [];

  isLoading:any;  // Esto solo aplica para cuando trabajo con metronic, sin esto no carga los datos en la plataforma, a pesar de traerlos bien del backend
  constructor(
    public modalService:NgbModal,
    public userService: UsersService,
  ){

  }
  ngOnInit(){
    this.listUsers();
    this.isLoading = this.userService.isLoading$;   // Necesario hacerlo para relacionar el isLoading con el componente donde lo estoy utilizando
                                                    // Además en el HTML debo aplicar <span class="spinner-border spinner-border-sm align-middle ms-2" *ngIf="isLoading | async"></span>
  }
  listUsers (){
    this.userService.listUsers(this.search,this.state).subscribe((resp:any) => {
      this.USERS =  resp.users.data;
      console.log(this.USERS)
    })
  }
  registerUser(){
    const modalRef = this.modalService.open(AddUsersComponent,{centered:true, size:'md'});

    modalRef.componentInstance.UserC.subscribe((User:any)=>{  // Aqui utilizo el UserC que se definio con el @OutPut en AddUserComponent
      this.USERS.unshift(User)
    })
  }
  editUser(USER:any){
    const modalRef = this.modalService.open(EditUsersComponent,{centered:true, size:'md'});
    modalRef.componentInstance.USER = USER;

    modalRef.componentInstance.UserE.subscribe((User:any)=>{  // Aqui utilizo el UserC que se definio con el @OutPut en AddUserComponent
      // this.USERS.unshift(User)
      let index = this.USERS.findIndex((item:any) => item.id == User.id);
      if (index != -1) {
        this.USERS[index] = User;
      }
    })
  }
  deleteUser(USER:any){
    const modalRef = this.modalService.open(DeleteUsersComponent,{centered:true, size:'md'});
    modalRef.componentInstance.USER = USER;

    modalRef.componentInstance.UserD.subscribe((User:any)=>{  // Aqui utilizo el UserC que se definio con el @OutPut en AddUserComponent

      let index = this.USERS.findIndex((item:any) => item.id == USER.id);
      if (index != -1) {
        this.USERS.splice(index,1);
      }
    })
  }
}
