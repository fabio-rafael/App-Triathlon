import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editDeleteTime',
  templateUrl: './editDeleteTime.component.html',
  styleUrls: ['./editDeleteTime.component.scss']
})
export class EditDeleteTimeComponent  {

  constructor() { }

  triatlo: string[] = ["Triatlo Sprint", "Triatlo Olímpico", "Meio-Ironman (70.3)", "Ironman (Full Distance)"];
  triatlo_sprint: string[] = ["750m", "20km", "5km"];
  triatlo_olimpico: string[] = ["1500m", "40km", "10km"];
  triatlo_meio_ironman: string[] = ["1,9km", "90km", "21,1km"];
  triatlo_ironman: string[] = ["3,8km", "180km", "42,2km"];


  tempo1: any = {};
  tempo2: any = {};
  diferenca: any = {};
  errorMessage: string = "";

  // Referenciar os inputs 
  @ViewChild('natacao1h') natacao1h!: ElementRef;
  @ViewChild('natacao1m') natacao1m!: ElementRef;
  @ViewChild('natacao1s') natacao1s!: ElementRef;
  @ViewChild('t11h') t11h!: ElementRef;
  @ViewChild('t11m') t11m!: ElementRef;
  @ViewChild('t11s') t11s!: ElementRef;
  @ViewChild('cliclismo1h') ciclismo1h!: ElementRef;
  @ViewChild('ciclismo1m') ciclismo1m!: ElementRef;
  @ViewChild('ciclismo1s') ciclismo1s!: ElementRef;
  @ViewChild('t21h') t21h!: ElementRef;
  @ViewChild('t21m') t21m!: ElementRef;
  @ViewChild('t21s') t21s!: ElementRef;
  @ViewChild('run1h') run1h!: ElementRef;
  @ViewChild('run1m') run1m!: ElementRef;
  @ViewChild('run1s') run1s!: ElementRef;



  // Atualizar os brakets do html

  distancias: string[] = this.triatlo_olimpico;
  onTriatloChange(event: any) {
    const selectedTriatlo = event.target.value;

    switch (selectedTriatlo) {
      case 'Triatlo Sprint':
        this.distancias = this.triatlo_sprint;
        break;
      case 'Triatlo Olímpico':
        this.distancias = this.triatlo_olimpico;
        break;
      case 'Meio-Ironman (70.3)':
        this.distancias = this.triatlo_meio_ironman;
        break;
      case 'Ironman (Full Distance)':
        this.distancias = this.triatlo_ironman;
        break;
      default:
        this.distancias = [];
        break;
    }
  }

  onTimeChange(event: any) {
  }
  
  //Validar se todos os campos foram preenchidos
  validateInputs(): boolean {
    return this.natacao1h.nativeElement.value && this.natacao1m.nativeElement.value && this.natacao1s.nativeElement.value &&
           this.t11h.nativeElement.value && this.t11m.nativeElement.value && this.t11s.nativeElement.value &&
           this.ciclismo1h.nativeElement.value && this.ciclismo1m.nativeElement.value && this.ciclismo1s.nativeElement.value &&
           this.t21h.nativeElement.value && this.t21m.nativeElement.value && this.t21s.nativeElement.value &&
           this.run1h.nativeElement.value && this.run1m.nativeElement.value && this.run1s.nativeElement.value ;
  }


  editTime(){

  }

  deleteTime(){

  }
}


