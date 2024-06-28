import { Component, OnInit } from '@angular/core';
import { NavabarComponent } from "../navabar/navabar.component";
import { CommonModule } from '@angular/common';
import { GetDataService } from '../service/get-data.service';
import { RouterModule } from '@angular/router'; 
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavabarComponent, CommonModule,RouterModule ]
})
export class HomeComponent implements OnInit {


    bannerImgs=[
        { id:1, img:'/images/banner/banner1.webp'},
        { id:2, img:'/images/banner/banner2.webp'},
        { id:3, img:'/images/banner/banner3.webp'}
    ] 

    getCategorisData:any;
    getApplianceProductDate:any=[];
    getFashionProductDate:any=[];

    constructor(private getData:GetDataService){

    }
     
    ngOnInit(): void {
        this.getCategorisData=this.getData.categoriesData;
        this.getData.productData.filter((ele:any)=>{

            if(ele.pdCategory== 'appliances'){
                this.getApplianceProductDate.push(ele);
            }
            if(ele.pdCategory== 'fashion'){
                this.getFashionProductDate.push(ele);
            }
        })
    }


    
}
