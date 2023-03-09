import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Address, Hero, states } from 'src/app/models/heros';
import { HeroService } from 'src/app/localshared/services/hero.service';

@Component({
  selector: 'ngx-form1',
  templateUrl: './ngx.form1.component.html',
  styleUrls: ['./ngx.form1.component.scss'],
})
export class NgxForm1Component implements OnChanges {
  private COMPONENT_NAME = 'NgxForm1Component';

  @Input() hero: Hero;

  public ngxControl = new FormControl();
  disabledTypeSelectors = false;

  heroForm: FormGroup;
  nameChangeLog: string[] = [];
  states = states;

  public items: string[] = [
    'Amsterdam',
    'Antwerp',
    'Athens',
    'Barcelona',
    'Berlin',
    'Birmingham',
    'Bradford',
    'Bremen',
    'Brussels',
    'Bucharest',
    'Budapest',
    'Cologne',
    'Copenhagen',
    'Dortmund',
    'Dresden',
    'Dublin',
    'Düsseldorf',
    'Essen',
    'Frankfurt',
    'Genoa',
    'Glasgow',
    'Gothenburg',
    'Hamburg',
    'Hannover',
    'Helsinki',
    'Kraków',
    'Leeds',
    'Leipzig',
    'Lisbon',
    'London',
    'Madrid',
    'Manchester',
    'Marseille',
    'Milan',
    'Munich',
    'Málaga',
    'Naples',
    'Palermo',
    'Paris',
    'Poznań',
    'Prague',
    'Riga',
    'Rome',
    'Rotterdam',
    'Seville',
    'Sheffield',
    'Sofia',
    'Stockholm',
    'Stuttgart',
    'The Hague',
    'Turin',
    'Valencia',
    'Vienna',
    'Vilnius',
    'Warsaw',
    'Wrocław',
    'Zagreb',
    'Zaragoza',
    'Łódź',
  ];

  constructor(private fb: FormBuilder, private heroService: HeroService) {
    this.createForm();
    this.logNameChange();
  }

  enableDisable() {
    this.disabledTypeSelectors = !this.disabledTypeSelectors;
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: '',
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: '',
    });
  }

  ngOnChanges() {
    console.log(this.COMPONENT_NAME + ', ngOnChanges');
    this.heroForm.reset({
      name: this.hero.name,
    });
    this.setAddresses(this.hero.addresses);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map((address) => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }

  onSubmit() {
    console.log(this.COMPONENT_NAME + ', onSubmit');
    this.hero = this.prepareSaveHero();
    this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map((address: Address) => Object.assign({}, address));

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      // addresses: formModel.secretLairs // <-- bad!
      addresses: secretLairsDeepCopy,
    };
    return saveHero;
  }

  revert() {
    console.log(this.COMPONENT_NAME + ', revert');
    this.ngOnChanges();
  }

  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach((value: string) => this.nameChangeLog.push(value));
  }
}
