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
    if(!this.name || !this.type || !this.category || !this.description){
      this.toastr.error('NECESITAS INGRESAR TODOS LOS CAMPOS','VALIDACIÓN')
      return;
    }
    let data = {
      name: this.name,
      type: this.type,
      category: this.category,
      description: this.description,
    }
    this.productPaypalService.registerProduct(data).subscribe((resp:any)=>{
      console.log(resp);
      this.ProductC.emit(resp.product);
      this.toastr.success("SE HA CREADO UN PRODUCTO EXITOSAMENTE",'VALIDACIÓN')
      this.modal.close()
    })
  }
}
