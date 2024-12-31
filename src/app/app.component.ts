import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import pills from './pills.json';

type Pill = {
  name: string;
  manufacturer: string;
  strength: string;
  class: string;
  form: string;
  plNumber: string;
  shape: string;
  imprint1: string;
  imprint2: string;
  size: string;
  colour: string;
  image?: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  pillColours: string[] = ['None', 'White', 'Off-White', 'Clear', 'Gray', 'Black', 'Red', 'Blue', 'Pink', 'Tan', 'Brown', 'Orange', 'Peach', 'Yellow', 'Gold', 'Green', 'Turquoise', 'Purple', 'Multi-Colour'];
  pillShapes: string[] = ['None', 'Round', 'Oblong', 'Oval', 'Square', 'Rectangle', 'Diamond', 'Triangle', 'Pentagon', 'Hexagon', 'Heptagon', 'Octagon', 'Other'];
  pills: Pill[] = pills;
  identifyingPills: boolean = false;
  identifiedPills: Pill[] = [];
  isSubmitted: boolean = false;
  dateYear: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      pillImprint1: ['', Validators.nullValidator],
      pillImprint2: ['', Validators.nullValidator],
      pillColour: ['', Validators.nullValidator],
      pillShape: ['', Validators.nullValidator],
    });
  }

  onSubmit(): void {
    this.identifyingPills = true;
    const pillImprint1: string = this.form.controls['pillImprint1'].value;
    const pillImprint2: string = this.form.controls['pillImprint2'].value;
    const pillColour: string = this.form.controls['pillColour'].value;
    const pillShape: string = this.form.controls['pillShape'].value;
    this.identifyingPills = true;
    this.identifiedPills = this.pills.filter(pill =>
      (pill.imprint1.toLowerCase() === pillImprint1.toLowerCase() || pill.imprint1.toLowerCase() === pillImprint2.toLowerCase() || pillImprint1 === '') &&
      (pill.imprint2.toLowerCase() === pillImprint2.toLowerCase() || pill.imprint2.toLowerCase() === pillImprint1.toLowerCase() || pillImprint2 === '') &&
      (pill.colour.toLowerCase() === pillColour.toLowerCase() || pillColour === 'None' || pillColour === '') &&
      (pill.shape.toLowerCase() === pillShape.toLowerCase() || pillShape === 'None' || pillShape === '')
    );
    this.isSubmitted = true;
    this.identifyingPills = false;
  }
}
