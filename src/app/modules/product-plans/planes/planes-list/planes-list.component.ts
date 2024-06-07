import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductAddComponent } from '../../product/product-add/product-add.component';
import { ProductEditComponent } from '../../product/product-edit/product-edit.component';
import { PlanesPaypalService } from '../../service/planes-paypal.service';
import { ProductPaypalService } from '../../service/product-paypal.service';
import { PlanesAddComponent } from '../planes-add/planes-add.component';
import { PlanesAditComponent } from '../planes-adit/planes-adit.component';

@Component({
  selector: 'app-planes-list',
  templateUrl: './planes-list.component.html',
  styleUrls: ['./planes-list.component.scss']
})
export class PlanesListComponent {
  search:any = null
  PRODUCTS:any = []
  PLANES:any = []

  isLoading:any;  // Esto solo aplica para cuando trabajo con metronic, sin esto no carga los datos en la plataforma, a pesar de traerlos bien del backend
  constructor(
    public modalService:NgbModal,
    public productPaypalService: ProductPaypalService,
    public planesPaypalService: PlanesPaypalService,
  ){}

  ngOnInit(){
    this.isLoading = this.planesPaypalService.isLoading$;
    this.listProducts();
    this.listPlanes()
  }

  listProducts(){
    this.productPaypalService.listProducts().subscribe((resp:any) => {
      console.log(resp)
      this.PRODUCTS =  resp.products;
    })
  }

  listPlanes(){
    this.planesPaypalService.listPlanes(this.search).subscribe((resp:any) => {
      console.log(resp)
      this.PLANES =  resp.plans;
    })
  }

  registerPlane(){
    // Se crea el registro del plan como una ventana modal
    const modalRef = this.modalService.open(PlanesAddComponent,{centered:true, size:'md'});

    // Se envia el listado de PRODUCTS a la modal
    modalRef.componentInstance.PRODUCTS = this.PRODUCTS

    modalRef.componentInstance.PlanC.subscribe((Plane:any)=>{  // Aqui utilizo el UserC que se definio con el @OutPut en AddUserComponent
      this.PLANES.unshift(Plane)
    })
  }

  editPlane(PLANE:any){
    const modalRef = this.modalService.open(PlanesAditComponent,{centered:true, size:'md'});

    modalRef.componentInstance.plane_selected = PLANE;
    modalRef.componentInstance.PRODUCTS = this.PRODUCTS;
    modalRef.componentInstance.PlanE.subscribe((Plane:any)=>{  // Aqui utilizo el UserC que se definio con el @OutPut en AddUserComponent
      // this.USERS.unshift(User)
      let index = this.PLANES.findIndex((item:any) => item.id == Plane.id);
      if (index != -1) {
        this.PLANES[index] = Plane;
      }
    })
  }
}
