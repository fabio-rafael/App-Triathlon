import { Component, OnInit } from '@angular/core';
import { AppApiService } from '../services/appAPI.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private appService: AppApiService) { }

  ngOnInit() {
    
  } 
}
