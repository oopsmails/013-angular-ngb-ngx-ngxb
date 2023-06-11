import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eg-highlisht',
  templateUrl: './eg-highlisht.component.html',
  styleUrls: ['./eg-highlisht.component.scss'],
})
export class EgHighlishtComponent implements OnInit {
  itemList: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  highlightedItem: string | null = null;

  ngOnInit() {
    this.highlightItems();
  }

  highlightItems() {
    let index = 0;
    setInterval(() => {
      this.highlightedItem = this.itemList[index];
      index = (index + 1) % this.itemList.length;
    }, 1000);
  }
}
