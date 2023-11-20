import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
})
export class TextEditorComponent implements OnInit, AfterViewInit {
  linkButton!: HTMLElement | null;
  advancedOptionButton!: NodeListOf<Element>;

  selectedBackColor: string = '';
  selectedForeColor: string = '';

  // Select Heading
  selectedHeading: string = 'p';

  // Select Font
  selectedFont: string = 'Roboto';

  // Select FontSize
  selectedFontSize: number = 1;

  //List of fontlist
  fontList: string[] = [
    'Roboto',
    'Arial',
    'Verdana',
    'Times New Roman',
    'Garamond',
    'Georgia',
    'Courier New',
    'Cursive',
  ];

  fontSizeOptions: number[] = Array.from({ length: 7 }, (_, i) => i + 1);

  ngAfterViewInit(): void {
    // this.initializer();
  }

  createLink() {
    let userLink = prompt('Enter a URL');
    // If the link has http, then pass directly else add https
    if (userLink && /http/i.test(userLink)) {
      this.modifyText(this.linkButton!.id, false, userLink);
    } else if (userLink) {
      userLink = 'http://' + userLink;
      this.modifyText(this.linkButton!.id, false, userLink);
    }
  }

  ngOnInit() {
    this.advancedOptionButton = document.querySelectorAll('.adv-option-button');
    this.linkButton = document.getElementById('createLink');
  }

  //main logic
  modifyText = (command: string, defaultUi: boolean, value: any) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);

    console.log(command, defaultUi, value);
  };
}
