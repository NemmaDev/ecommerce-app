import { Component, OnInit } from '@angular/core';
import { NavabarComponent } from "../navabar/navabar.component";
import { GetDataService } from '../service/get-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../service/data-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
    selector: 'app-product-detail',
    standalone: true,
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css',
    imports: [NavabarComponent,CommonModule,RouterModule]
})
export class ProductDetailComponent implements OnInit{


    constructor(private route:ActivatedRoute, private getData: GetDataService, private dataStorage:DataStorageService, private router: Router ){}

    getParamValue:any;
    getProductDetails:any;
    storeCartData:any=[];
    inCart:boolean=false;
    ngOnInit(): void {
       this.getParamValue= this.route.snapshot.paramMap.get('id');
        
       var getVal= this.dataStorage.getCartData();
        this.storeCartData = getVal ? getVal : [];

       this.getData.productData.filter((ele:any)=>{
        if(ele.pdId == this.getParamValue){
            this.getProductDetails=ele;
        }
            
       })
       this.storeCartData.filter((ele:any)=>{
            if(ele.pdId == this.getParamValue){
                this.inCart=true;
            }
       });
    }
    addCart(data:any) {
        data['plusMinusCount']=1;
            this.storeCartData.push(data);
            this.dataStorage.storeCartData(this.storeCartData);
            this.router.navigate(['/'])
        }

}
