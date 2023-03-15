import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-homemade',
  templateUrl: './homemade.component.html',
  styleUrls: ['./homemade.component.scss'],
})
export class HomemadeComponent implements OnInit {
  scrollProgress: number = 0;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (window.scrollY / totalHeight) * 100;
  }
}
