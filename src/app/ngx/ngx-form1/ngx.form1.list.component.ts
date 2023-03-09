import { Component, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Hero } from 'src/app/models/heros';
import { HeroService } from 'src/app/localshared/services/hero.service';

/**
 * ref: https://stackblitz.com/edit/angular-s4bkg5?file=src%2Fapp%2Fhero-detail%2Fhero-detail.component.html
 */

@Component({
  selector: 'ngx-form1-list',
  templateUrl: './ngx.form1.list.component.html',
  styleUrls: ['./ngx.form1.list.component.scss'],
})
export class NgxForm1ListComponent implements OnInit {
  heroes: Observable<Hero[]>;
  isLoading = false;
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.isLoading = true;
    this.heroes = this.heroService
      .getHeroes()
      // TODO: error handling
      .pipe(finalize(() => (this.isLoading = false)));

    this.selectedHero = undefined;
  }

  select(hero: Hero) {
    this.selectedHero = hero;
  }
}
