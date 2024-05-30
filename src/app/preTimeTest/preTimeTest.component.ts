import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-preTimeTest',
  templateUrl: './preTimeTest.component.html',
  styleUrls: ['./preTimeTest.component.scss']
})
export class PreTimeTestComponent  {

  
  triatlo: string[] = ["Triatlo Sprint", "Triatlo Olímpico", "Meio-Ironman (70.3)", "Ironman (Full Distance)"];
  triatlo_sprint: string[] = ["750m", "20km", "5km"];
  triatlo_olimpico: string[] = ["1500m", "40km", "10km"];
  triatlo_meio_ironman: string[] = ["1,9km", "90km", "21,1km"];
  triatlo_ironman: string[] = ["3,8km", "180km", "42,2km"];

  tempoGanho: any = {};
  tempo1: any = {};
  tempo2: any = {};
  diferenca: any = {};
  errorMessage: string = "";
  compararClicked:boolean = false;

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

  @ViewChild('natacao2h') natacao2h!: ElementRef;
  @ViewChild('natacao2m') natacao2m!: ElementRef;
  @ViewChild('natacao2s') natacao2s!: ElementRef;
  @ViewChild('t12h') t12h!: ElementRef;
  @ViewChild('t12m') t12m!: ElementRef;
  @ViewChild('t12s') t12s!: ElementRef;
  @ViewChild('cliclismo2h') ciclismo2h!: ElementRef;
  @ViewChild('ciclismo2m') ciclismo2m!: ElementRef;
  @ViewChild('ciclismo2s') ciclismo2s!: ElementRef;
  @ViewChild('t22h') t22h!: ElementRef;
  @ViewChild('t22m') t22m!: ElementRef;
  @ViewChild('t22s') t22s!: ElementRef;
  @ViewChild('run2h') run2h!: ElementRef;
  @ViewChild('run2m') run2m!: ElementRef;
  @ViewChild('run2s') run2s!: ElementRef;

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
  
  //Validar se todos os campos foram preenchidos
  validateInputs(): boolean {
    return this.natacao1h.nativeElement.value && this.natacao1m.nativeElement.value && this.natacao1s.nativeElement.value &&
           this.t11h.nativeElement.value && this.t11m.nativeElement.value && this.t11s.nativeElement.value &&
           this.ciclismo1h.nativeElement.value && this.ciclismo1m.nativeElement.value && this.ciclismo1s.nativeElement.value &&
           this.t21h.nativeElement.value && this.t21m.nativeElement.value && this.t21s.nativeElement.value &&
           this.run1h.nativeElement.value && this.run1m.nativeElement.value && this.run1s.nativeElement.value &&
           this.natacao2h.nativeElement.value && this.natacao2m.nativeElement.value && this.natacao2s.nativeElement.value &&
           this.t12h.nativeElement.value && this.t12m.nativeElement.value && this.t12s.nativeElement.value &&
           this.ciclismo2h.nativeElement.value && this.ciclismo2m.nativeElement.value && this.ciclismo2s.nativeElement.value &&
           this.t22h.nativeElement.value && this.t22m.nativeElement.value && this.t22s.nativeElement.value &&
           this.run2h.nativeElement.value && this.run2m.nativeElement.value && this.run2s.nativeElement.value;
  }

  // Comparar os tempos 
  compareTimes() {
    if (this.validateInputs()) {
      this.tempo1.natacao = this.getTime(this.natacao1m, this.natacao1s);
      this.tempo1.t1 = this.getTime(this.t11m, this.t11s);
      this.tempo1.ciclismo = this.getTime(this.ciclismo1m, this.ciclismo1s);
      this.tempo1.t2 = this.getTime(this.t21m, this.t21s);
      this.tempo1.run = this.getTime(this.run1m, this.run1s);

      this.tempo2.natacao = this.getTime(this.natacao2m, this.natacao2s);
      this.tempo2.t1 = this.getTime(this.t12m, this.t12s);
      this.tempo2.ciclismo = this.getTime(this.ciclismo2m, this.ciclismo2s);
      this.tempo2.t2 = this.getTime(this.t22m, this.t22s);
      this.tempo2.run = this.getTime(this.run2m, this.run2s);

      this.diferenca.natacao = this.calculateDifference(this.tempo1.natacao, this.tempo2.natacao);
      this.diferenca.t1 = this.calculateDifference(this.tempo1.t1, this.tempo2.t1);
      this.diferenca.ciclismo = this.calculateDifference(this.tempo1.ciclismo, this.tempo2.ciclismo);
      this.diferenca.t2 = this.calculateDifference(this.tempo1.t2, this.tempo2.t2);
      this.diferenca.run = this.calculateDifference(this.tempo1.run, this.tempo2.run);

      this.compararClicked = true;
    } else {
      this.errorMessage = 'Todos os campos de tempo são obrigatórios preencher.';
    }
  }

  // Passar tudo para segundos
  getTime(minutesInput: ElementRef, secondsInput: ElementRef): number {
    const minutes = minutesInput.nativeElement.value || 0;
    const seconds = secondsInput.nativeElement.value || 0;
    return parseInt(minutes) * 60 + parseInt(seconds);
  }

  // Calculo da diferença em segundos
  calculateDifference(time1: number, time2: number): string {
    const difference = Math.abs(time1 - time2);
    const minutes = Math.floor(difference / 60);
    const seconds = difference % 60;
    return `${minutes}m ${seconds}s`;
  }

  cleanup() {
    
   // Limpar inputs para tempo1
   this.natacao1m.nativeElement.value = "";
   this.natacao1s.nativeElement.value = "";
   this.t11m.nativeElement.value = "";
   this.t11s.nativeElement.value = "";
   this.ciclismo1m.nativeElement.value = "";
   this.ciclismo1s.nativeElement.value = "";
   this.t21m.nativeElement.value = "";
   this.t21s.nativeElement.value = "";
   this.run1m.nativeElement.value = "";
   this.run1s.nativeElement.value = "";

   // Limpar inputs para tempo2
   this.natacao2m.nativeElement.value = "";
   this.natacao2s.nativeElement.value = "";
   this.t12m.nativeElement.value = "";
   this.t12s.nativeElement.value = "";
   this.ciclismo2m.nativeElement.value = "";
   this.ciclismo2s.nativeElement.value = "";
   this.t22m.nativeElement.value = "";
   this.t22s.nativeElement.value = "";
   this.run2m.nativeElement.value = "";
   this.run2s.nativeElement.value = "";
    
   //Limpar tabela
    
    this.tempo1.natacao ="";
    this.tempo1.t1 ="";
    this.tempo1.ciclismo ="";
    this.tempo1.t2 ="";
    this.tempo1.run ="";

    this.tempo2.natacao ="";
    this.tempo2.t1 ="";
    this.tempo2.ciclismo ="";
    this.tempo2.t2 ="";
    this.tempo2.run ="";

    this.diferenca.natacao ="";
    this.diferenca.t1 ="";
    this.diferenca.ciclismo ="";
    this.diferenca.t2 ="";
    this.diferenca.run ="";

    this.tempoGanho = "";
    }

    onTimeChange($event : any){}

}
