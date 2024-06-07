import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ProductPaypalService} from '../../service/product-paypal.service'
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  PRODUCTS:any = []
  search:any = null

  isLoading:any;  // Esto solo aplica para cuando trabajo con metronic, sin esto no carga los datos en la plataforma, a pesar de traerlos bien del backend
  constructor(
    public modalService:NgbModal,
    public productPaypalService: ProductPaypalService,
  ){}

  ngOnInit(){
    this.isLoading = this.productPaypalService.isLoading$;
    this.listProducts()
  }

  listProducts(){
    this.productPaypalService.listProducts(this.search).subscribe((resp:any) => {
      console.log(resp)
      this.PRODUCTS =  resp.products;
    })
  }

  registerProduct(){
    const modalRef = this.modalService.open(ProductAddComponent,{centered:true, size:'md'});

    modalRef.componentInstance.ProductC.subscribe((Product:any)=>{  // Aqui utilizo el UserC que se definio con el @OutPut en AddUserComponent
      this.PRODUCTS.unshift(Product)
    })
  }

  editProduct(PRODUCT:any){
    const modalRef = this.modalService.open(ProductEditComponent,{centered:true, size:'md'});

    // Para enviar a la ventana modal de Edit
    modalRef.componentInstance.product_selected = PRODUCT;

    modalRef.componentInstance.ProductE.subscribe((Product:any)=>{  // Aqui utilizo el UserC que se definio con el @OutPut en AddUserComponent
      // this.USERS.unshift(User)
      let index = this.PRODUCTS.findIndex((item:any) => item.id == Product.id);
      if (index != -1) {
        this.PRODUCTS[index] = Product;
      }
    })
  }


}
