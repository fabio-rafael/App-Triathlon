import { Component, OnInit } from '@angular/core';
import { AppApiService } from '../services/appAPI.service';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private appService: AppApiService) { }

  ngOnInit(): void {
    const textWrapper = document.querySelector('#cubed');
    if (textWrapper && textWrapper.textContent) {
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");

      anime.timeline({ loop: false })
        .add({
          targets: '#cubed .letter',
          translateX: [40, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1200,
          delay: (el, i) => 500 + 30 * i
        });
    }
  }
}
