import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
})
export class TextEditorComponent implements OnInit, AfterViewInit {
  optionsButtons!: NodeListOf<Element>;
  advancedOptionButton!: NodeListOf<Element>;
  fontName!: HTMLElement | null;
  fontSizeRef!: HTMLElement | null;
  writingArea!: HTMLElement | null;
  linkButton!: HTMLElement | null;
  alignButtons!: NodeListOf<Element>;
  spacingButtons!: NodeListOf<Element>;
  formatButtons!: NodeListOf<Element>;
  scriptButtons!: NodeListOf<Element>;

  //List of fontlist
  fontList: string[] = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Garamond',
    'Georgia',
    'Courier New',
    'cursive',
  ];

  selectedFont: string = ''; // Zmienna przechowująca aktualnie wybraną czcionkę
  selectedFontSize: number = 1; // Domyślny rozmiar czcionki
  fontSizeOptions: number[] = Array.from({ length: 7 }, (_, i) => i + 1);

  ngAfterViewInit(): void {
    this.initializer();
  }

  ngOnInit() {
    this.optionsButtons = document.querySelectorAll('.option-button');
    this.advancedOptionButton = document.querySelectorAll('.adv-option-button');
    this.fontName = document.getElementById('fontName');
    this.fontSizeRef = document.getElementById('fontSize');
    this.writingArea = document.getElementById('text-input');
    this.linkButton = document.getElementById('createLink');
    this.alignButtons = document.querySelectorAll('.align');
    this.spacingButtons = document.querySelectorAll('.spacing');
    this.formatButtons = document.querySelectorAll('.format');
    this.scriptButtons = document.querySelectorAll('.script');

    // Sprawdzenie, czy elementy istnieją przed użyciem
    if (
      this.fontName === null ||
      this.fontSizeRef === null ||
      this.writingArea === null ||
      this.linkButton === null
    ) {
      // Obsługa błędu lub dodatkowe działania w razie potrzeby
      console.error('Nie znaleziono elementów');
    }

    // Inicjalizacja
    this.initializer();

    this.optionsButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.modifyText(button.id, false, null);
      });
    });

    //options that require value parameter (e.g colors, fonts)
    this.advancedOptionButton.forEach((button) => {
      button.addEventListener('change', () => {
        if (button instanceof HTMLInputElement) {
          this.modifyText(button.id, false, button.value);
        }
      });
    });

    //link
    this.linkButton?.addEventListener('click', () => {
      let userLink = prompt('Enter a URL');
      // If the link has http, then pass directly else add https
      if (userLink && /http/i.test(userLink)) {
        this.modifyText(this.linkButton!.id, false, userLink);
      } else if (userLink) {
        userLink = 'http://' + userLink;
        this.modifyText(this.linkButton!.id, false, userLink);
      }
    });

    //Highlight clicked button
    this.highlighter = (className, needsRemoval) => {
      className.forEach((button) => {
        button.addEventListener('click', () => {
          //needsRemoval = true means only one button should be highlight and other would be normal
          if (needsRemoval) {
            let alreadyActive = false;

            //If currently clicked button is already active
            if (button.classList.contains('active')) {
              alreadyActive = true;
            }

            //Remove highlight from other buttons
            this.highlighterRemover(className);
            if (!alreadyActive) {
              //highlight clicked button
              button.classList.add('active');
            }
          } else {
            //if other buttons can be highlighted
            button.classList.toggle('active');
          }
        });
      });
    };
  }

  initializer() {
    //function calls for highlighting buttons
    //No highlights for link, unlink, lists, undo, redo since they are one-time operations
    this.highlighter(this.alignButtons, true);
    this.highlighter(this.spacingButtons, true);
    this.highlighter(this.formatButtons, false);
    this.highlighter(this.scriptButtons, true);
  }

  highlighter(buttons: NodeListOf<Element>, isOneTimeOperation: boolean) {
    // Implementacja funkcji highlighter
  }

  //main logic
  modifyText = (command: string, defaultUi: boolean, value: any) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
  };

  highlighterRemover = (className: NodeListOf<Element>) => {
    className.forEach((button) => {
      button.classList.remove('active');
    });
  };
}
