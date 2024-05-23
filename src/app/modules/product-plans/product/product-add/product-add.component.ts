import { Component, EventEmitter, Output } from '@angular/core';
import { ProductPaypalService } from '../../service/product-paypal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  @Output() ProductC: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)
  name:string = ''
  type:string = ''
  category:string = ''
  description:string = ''

  constructor(
    public modal:NgbActiveModal,
    public toastr: ToastrService,
    public productPaypalService: ProductPaypalService,
  ){

  }
  close(){
    this.modal.close()
  }

  save(){

  }
}
