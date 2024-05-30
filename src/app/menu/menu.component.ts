import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/appService.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private appService: AppServiceService) { }

  ngOnInit() {
    this.appService.getAllTimes();
  }

  getAllTimes() {
    this.appService.getAllTimes().subscribe((res)=>{
      
    })
  }

}
