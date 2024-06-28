import { Component, OnInit } from '@angular/core';
import { NavabarComponent } from "../navabar/navabar.component";
import { DataStorageService } from '../service/data-storage.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [NavabarComponent,CommonModule, ]
})
export class CartComponent implements OnInit {



    constructor (private dataStorage: DataStorageService,private route: Router ){}

    getCartData:any;
    storeCatrtArry:any=[];
    totalAmount: number=0;
    totalCart:number=0;

    ngOnInit(): void {
       this.getCartData= this.dataStorage.getCartData();
       this.totalCart= this.getCartData? this.getCartData.length :0;
       if(this.getCartData){
                this.getCartData.filter((ele:any)=>{
                    this.totalAmount= ele.pdPrice *ele.plusMinusCount + this.totalAmount;
            });
       }
       
    }

    removeCart(data:any) {
        this.totalAmount=0;
            localStorage.removeItem('cart-data');
            this.storeCatrtArry=[];
            this.getCartData.filter((ele:any)=>{
                if(ele.pdId != data.pdId){
                    this.storeCatrtArry.push(ele);
                    this.totalAmount=ele.pdPrice + this.totalAmount;

                }
            });


            this.dataStorage.storeCartData(this.storeCatrtArry);
            this.getCartData=this.dataStorage.getCartData();
            this.totalCart= this.getCartData.length;
        }

        plusMinusCount(data: any,type: any) {
            this.storeCatrtArry=[];
            this.totalAmount=0;
                var plusMinusValue= data.plusMinusCount;
                if(type == 'minus'){
                    let minusCount = plusMinusValue -1;
                    this.getCartData.filter((ele:any)=>{
                        if(data.pdId== ele.pdId){
                            ele['plusMinusCount']= minusCount;
                        }
                        this.totalAmount= ele.pdPrice * ele.plusMinusCount + this.totalAmount;
                       
                    })

                    this.storeCatrtArry=this.getCartData;
                    this.dataStorage.storeCartData(this.storeCatrtArry);
                    this.getCartData= this.dataStorage.getCartData();
                }
                if(type == 'plus'){
                    let plusCount = plusMinusValue +1;
                    this.getCartData.filter((ele:any)=>{
                        if(data.pdId== ele.pdId){
                            ele['plusMinusCount']=plusCount;
                        }
                        this.totalAmount= ele.pdPrice * ele.plusMinusCount + this.totalAmount;

                    })

                    this.storeCatrtArry=this.getCartData;
                    this.dataStorage.storeCartData(this.storeCatrtArry);
                    this.getCartData= this.dataStorage.getCartData();
                }
            
            }


            orderclick() {
                    localStorage.removeItem('cart-data');
                    this.route.navigate(['/']);
                }

}
