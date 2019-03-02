import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {

 @ViewChild('txtPercentage') txtPercentage: ElementRef;

 @Input('nombre') label: string = 'Texto';
 @Input() percentage: number = 50;

 @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges(newValue: number) {

    // const elemHTML: any = document.getElementsByName('percentage')[0];
    // console.log(elemHTML.value);

    // console.log(this.txtPercentage);

    if (newValue >= 100) {
      this.percentage = 100;
    } else if (newValue <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = newValue;
    }

    // elemHTML.value = Number(this.percentage);

    this.txtPercentage.nativeElement.value = this.percentage;

    this.cambioValor.emit(this.percentage);
  }

  cambiarValor(valor) {
    if (this.percentage >= 100 && valor > 0) {
      this.percentage = 100;
      return;
    }

    if (this.percentage <= 0 && valor < 0) {
      this.percentage = 0;
      return;
    }

    this.percentage = this.percentage + valor;

    this.cambioValor.emit(this.percentage);

    this.txtPercentage.nativeElement.focus();
  }

}
