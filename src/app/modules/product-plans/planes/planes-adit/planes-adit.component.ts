import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PlanesPaypalService } from '../../service/planes-paypal.service';

@Component({
  selector: 'app-planes-adit',
  templateUrl: './planes-adit.component.html',
  styleUrls: ['./planes-adit.component.scss']
})
export class PlanesAditComponent {
  @Input() plane_selected:any;
  @Input() PRODUCTS:any = [];
  @Output() PlaneE: EventEmitter<any> = new EventEmitter();  // Para pasar datos del hijo-padre (en este caso a list-users)

  name:string = ''
  description:string = ''
  precio_mensual:number = 0
  precio_anual:number = 0
  month_free:number = 0
  product_paypal_id:any = 0

  ngOnInit(){
    this.name = this.plane_selected.name;
    this.description = this.plane_selected.description;
    this.precio_mensual = this.plane_selected.precio_mensual;
    this.precio_anual = this.plane_selected.precio_anual;
    this.month_free = this.plane_selected.month_free;
    this.product_paypal_id = this.plane_selected.product_paypal_id;
    // console.log(this.PRODUCTS)
  }
  constructor(
    public modal:NgbActiveModal,
    public toastr: ToastrService,
    public planePaypalService: PlanesPaypalService,
  ){

  }
  close(){
    this.modal.close()
  }

  save(){
    if(!this.name || !this.description || !this.product_paypal_id || !this.precio_mensual || !this.precio_anual){
      this.toastr.error('NECESITAS INGRESAR TODOS LOS CAMPOS','VALIDACIÓN')
      console.log(this.name + this.description)
      console.log(this.precio_mensual + this.precio_anual)
      console.log(this.product_paypal_id)
      return;
    }
    // Busco el id_product_paypal de PRODUCTS
    let id_product_paypal = this.PRODUCTS.find((item:any)=>item.id == this.product_paypal_id).id_product_paypal
    let data = {
      name: this.name,
      description: this.description,
      precio_mensual:this.precio_mensual,
      precio_anual:this.precio_anual,
      month_free:this.month_free,
      product_paypal_id: this.product_paypal_id,
      id_product_paypal: id_product_paypal
    }
    this.planePaypalService.editPlane(this.plane_selected.id,data).subscribe((resp:any)=>{
      console.log(resp);
      this.PlaneE.emit(resp.plan);
      this.toastr.success("SE HA EDITADO EL PLAN EXITOSAMENTE",'VALIDACIÓN')
      this.modal.close()
    })
  }
}
