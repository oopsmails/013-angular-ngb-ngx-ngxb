import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OopsLib001Module } from 'oops-lib001';
import { OopsLib002Module, SharedModule } from 'oops-lib002';
import { LocalsharedModule } from 'src/app/localshared/localshared.module';
import { HOME_HOME_LINK, HOME_BACK_TO_HOME } from 'src/app/localshared/models/home.constants';

@Component({
  selector: 'app-goto-css-1',
  standalone: true,
  imports: [
    // why errors if imports?
    // CommonModule,
    // BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    // OopsLib001Module,
    // OopsLib002Module,
    // SharedModule,
    // LocalsharedModule,
  ],
  templateUrl: './goto1.component.html',
  styleUrls: ['./goto1.component.scss'],
})
export class GoTo1Component implements OnInit {
  routerLinkInput = HOME_HOME_LINK;
  linkText = HOME_BACK_TO_HOME;

  code1: string = '.even-columns-flex > * { flex: 100%; } ';
  code2: string =
    'h1::before {    background: $clr-red;    width: 100vw;    left: 50%;    transform: translateX(-50%);    z-index: -2;}';

  constructor() {}

  ngOnInit(): void {}
}
