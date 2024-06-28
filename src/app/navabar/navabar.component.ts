import { DataStorageService } from './../service/data-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-navabar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navabar.component.html',
  styleUrl: './navabar.component.css'
})
export class NavabarComponent implements OnInit {

  constructor(private dataStorage:DataStorageService){}

  
  @Input() cartCount:number=0;
  ngOnInit(): void {
    var getVal= this.dataStorage.getCartData();
    this.cartCount=getVal ? getVal.length :0;
  }

}
