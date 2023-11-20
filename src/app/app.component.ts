import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  @ViewChild('textInput', { static: false }) textInput!: ElementRef;

  clearText() {
    this.textInput.nativeElement.innerHTML = '';
    console.log(this.textInput);
    
  }
}
