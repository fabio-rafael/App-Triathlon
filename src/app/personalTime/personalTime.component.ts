import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js'

@Component({
  selector: 'app-personalTime',
  templateUrl: './personalTime.component.html',
  styleUrls: ['./personalTime.component.scss'],
})
export class PersonalTimeComponent implements OnInit {
  triatlo: string[] = ["Sprint Triathlon", "Olympic Triathlon", "Half-Ironman (70.3)", "Ironman (Full Distance)"];
  triatlo_sprint: string[] = ['750m', '20km', '5km'];
  triatlo_olimpico: string[] = ['1500m', '40km', '10km'];
  triatlo_meio_ironman: string[] = ['1,9km', '90km', '21,1km'];
  triatlo_ironman: string[] = ['3,8km', '180km', '42,2km'];

  tempoGanho: any = {};
  tempo1: any = {};
  tempo2: any = {};
  diferenca: any = {};
  errorMessage: string = '';

  compararClicked: boolean = false;
  // Referenciar os inputs
  @ViewChild('natacao1h') natacao1h!: ElementRef;
  @ViewChild('natacao1m') natacao1m!: ElementRef;
  @ViewChild('natacao1s') natacao1s!: ElementRef;
  @ViewChild('t11h') t11h!: ElementRef;
  @ViewChild('t11m') t11m!: ElementRef;
  @ViewChild('t11s') t11s!: ElementRef;
  @ViewChild('ciclismo1h') ciclismo1h!: ElementRef;
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
  @ViewChild('ciclismo2h') ciclismo2h!: ElementRef;
  @ViewChild('ciclismo2m') ciclismo2m!: ElementRef;
  @ViewChild('ciclismo2s') ciclismo2s!: ElementRef;
  @ViewChild('t22h') t22h!: ElementRef;
  @ViewChild('t22m') t22m!: ElementRef;
  @ViewChild('t22s') t22s!: ElementRef;
  @ViewChild('run2h') run2h!: ElementRef;
  @ViewChild('run2m') run2m!: ElementRef;
  @ViewChild('run2s') run2s!: ElementRef;

  ngOnInit() {
    const textWrapper = document.querySelector('#cubed');
    if (textWrapper && textWrapper.textContent) {
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");

      anime.timeline({ loop: false })
        .add({
          targets: '#cubed .letter',
          translateX: [40, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1200,
          delay: (el, i) => 500 + 30 * i
        });
    }
  }
  distancias: string[] = this.triatlo_olimpico;

  onTriatloChange(event: any) {
    const selectedTriatlo = event.target.value;

    switch (selectedTriatlo) {
      case 'Sprint Triathlon':
        this.distancias = this.triatlo_sprint;
        break;
      case 'Olympic Triathlon':
        this.distancias = this.triatlo_olimpico;
        break;
      case 'Half-Ironman (70.3)':
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

  validateInputs(): boolean {
    this.errorMessage = '';

    const inputs = [
      { value: this.natacao1h.nativeElement.value, min: 0, max: 48, name: 'Swimming Hours of 1st Time' },
      { value: this.natacao1m.nativeElement.value, min: 0, max: 59, name: 'Swimming Minutes of 1st Time' },
      { value: this.natacao1s.nativeElement.value, min: 0, max: 59, name: 'Swimming Seconds of 1st Time' },
      { value: this.t11h.nativeElement.value, min: 0, max: 48, name: 'T1 Hours of 1st Time' },
      { value: this.t11m.nativeElement.value, min: 0, max: 59, name: 'T1 Minutes of 1st Time' },
      { value: this.t11s.nativeElement.value, min: 0, max: 59, name: 'T1 Seconds of 1st Time' },
      { value: this.ciclismo1h.nativeElement.value, min: 0, max: 48, name: 'Cycling Hours of 1st Time' },
      { value: this.ciclismo1m.nativeElement.value, min: 0, max: 59, name: 'Cycling Minutes of 1st Time' },
      { value: this.ciclismo1s.nativeElement.value, min: 0, max: 59, name: 'Cycling Seconds of 1st Time' },
      { value: this.t21h.nativeElement.value, min: 0, max: 48, name: 'T2 Hours of 1st Time' },
      { value: this.t21m.nativeElement.value, min: 0, max: 59, name: 'T2 Minutes of 1st Time' },
      { value: this.t21s.nativeElement.value, min: 0, max: 59, name: 'T2 Seconds of 1st Time' },
      { value: this.run1h.nativeElement.value, min: 0, max: 48, name: 'Running Hours of 1st Time' },
      { value: this.run1m.nativeElement.value, min: 0, max: 59, name: 'Running Minutes of 1st Time' },
      { value: this.run1s.nativeElement.value, min: 0, max: 59, name: 'Running Seconds of 1st Time' },
      { value: this.natacao2h.nativeElement.value, min: 0, max: 48, name: 'Swimming Hours of 2nd Time' },
      { value: this.natacao2m.nativeElement.value, min: 0, max: 59, name: 'Swimming Minutes of 2nd Time' },
      { value: this.natacao2s.nativeElement.value, min: 0, max: 59, name: 'Swimming Seconds of 2nd Time' },
      { value: this.t12h.nativeElement.value, min: 0, max: 48, name: 'T1 Hours of 2nd Time' },
      { value: this.t12m.nativeElement.value, min: 0, max: 59, name: 'T1 Minutes of 2nd Time' },
      { value: this.t12s.nativeElement.value, min: 0, max: 59, name: 'T1 Seconds of 2nd Time' },
      { value: this.ciclismo2h.nativeElement.value, min: 0, max: 48, name: 'Cycling Hours of 2nd Time' },
      { value: this.ciclismo2m.nativeElement.value, min: 0, max: 59, name: 'Cycling Minutes of 2nd Time' },
      { value: this.ciclismo2s.nativeElement.value, min: 0, max: 59, name: 'Cycling Seconds of 2nd Time' },
      { value: this.t22h.nativeElement.value, min: 0, max: 48, name: 'T2 Hours of 2nd Time' },
      { value: this.t22m.nativeElement.value, min: 0, max: 59, name: 'T2 Minutes of 2nd Time' },
      { value: this.t22s.nativeElement.value, min: 0, max: 59, name: 'T2 Seconds of 2nd Time' },
      { value: this.run2h.nativeElement.value, min: 0, max: 48, name: 'Running Hours of 2nd Time' },
      { value: this.run2m.nativeElement.value, min: 0, max: 59, name: 'Running Minutes of 2nd Time' },
      { value: this.run2s.nativeElement.value, min: 0, max: 59, name: 'Running Seconds of 2nd Time' },
    ];

    for (let input of inputs) {
      const value = parseInt(input.value);
      if (isNaN(value) || value < input.min || value > input.max) {
        this.errorMessage = `${input.name} must be between ${input.min} and ${input.max}.`;
        return false;
      }
    }
    return true;
  }

  compareTimes() {
    if (this.validateInputs()) {
      this.tempo1.natacao = this.getTime(this.natacao1h, this.natacao1m, this.natacao1s);
      this.tempo1.t1 = this.getTime(this.t11h, this.t11m, this.t11s);
      this.tempo1.ciclismo = this.getTime(this.ciclismo1h, this.ciclismo1m, this.ciclismo1s);
      this.tempo1.t2 = this.getTime(this.t21h, this.t21m, this.t21s);
      this.tempo1.run = this.getTime(this.run1h, this.run1m, this.run1s);

      this.tempo2.natacao = this.getTime(this.natacao2h, this.natacao2m, this.natacao2s);
      this.tempo2.t1 = this.getTime(this.t12h, this.t12m, this.t12s);
      this.tempo2.ciclismo = this.getTime(this.ciclismo2h, this.ciclismo2m, this.ciclismo2s);
      this.tempo2.t2 = this.getTime(this.t22h, this.t22m, this.t22s);
      this.tempo2.run = this.getTime(this.run2h, this.run2m, this.run2s);

      this.diferenca.natacao = this.calculateDifference(this.tempo1.natacao, this.tempo2.natacao);
      this.diferenca.t1 = this.calculateDifference(this.tempo1.t1, this.tempo2.t1);
      this.diferenca.ciclismo = this.calculateDifference(this.tempo1.ciclismo, this.tempo2.ciclismo);
      this.diferenca.t2 = this.calculateDifference(this.tempo1.t2, this.tempo2.t2);
      this.diferenca.run = this.calculateDifference(this.tempo1.run, this.tempo2.run);

      const tempoGanhoSegundos = this.convertToSeconds(this.diferenca.natacao) +
        this.convertToSeconds(this.diferenca.t1) +
        this.convertToSeconds(this.diferenca.ciclismo) +
        this.convertToSeconds(this.diferenca.t2) +
        this.convertToSeconds(this.diferenca.run);

      this.tempoGanho = this.formatTimeDifference(tempoGanhoSegundos);
      this.compararClicked = true;
    }
  }


  formatTime(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
  }

  getTime(hoursInput: ElementRef, minutesInput: ElementRef, secondsInput: ElementRef): number {
    const hours = parseInt(hoursInput.nativeElement.value) || 0;
    const minutes = parseInt(minutesInput.nativeElement.value) || 0;
    const seconds = parseInt(secondsInput.nativeElement.value) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }

  calculateDifference(time1: number, time2: number): string {
    const difference = Math.abs(time1 - time2);
    const hours = Math.floor(difference / 3600);
    const minutes = Math.floor((difference % 3600) / 60);
    const seconds = difference % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  convertToSeconds(time: string): number {
    const parts = time.split(' ');
    let seconds = 0;
    parts.forEach(part => {
      if (part.includes('h')) {
        seconds += parseInt(part.replace('h', '')) * 3600;
      } else if (part.includes('m')) {
        seconds += parseInt(part.replace('m', '')) * 60;
      } else if (part.includes('s')) {
        seconds += parseInt(part.replace('s', ''));
      }
    });
    return seconds;
  }

  formatTimeDifference(seconds: number): string {
    const negative = seconds < 0;
    seconds = Math.abs(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const sign = negative ? '-' : '';
    return `${sign}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${remainingSeconds}s`;
  }

  formatTempoGanho(tempoGanho: string): string {
    const tempoGanhoNumber = parseInt(tempoGanho.replace(/[^\d]/g, ''));
    if (tempoGanhoNumber > 0) {
      return `+${tempoGanho}`;
    } else if (tempoGanhoNumber < 0) {
      return tempoGanho;
    } else {
      return '';
    }
  }

  cleanup() {
    // Limpar inputs para tempo1
    this.natacao1h.nativeElement.value = '';
    this.natacao1m.nativeElement.value = '';
    this.natacao1s.nativeElement.value = '';
    this.t11h.nativeElement.value = '';
    this.t11m.nativeElement.value = '';
    this.t11s.nativeElement.value = '';
    this.ciclismo1h.nativeElement.value = '';
    this.ciclismo1m.nativeElement.value = '';
    this.ciclismo1s.nativeElement.value = '';
    this.t21h.nativeElement.value = '';
    this.t21m.nativeElement.value = '';
    this.t21s.nativeElement.value = '';
    this.run1h.nativeElement.value = '';
    this.run1m.nativeElement.value = '';
    this.run1s.nativeElement.value = '';

    // Limpar inputs para tempo2
    this.natacao2h.nativeElement.value = '';
    this.natacao2m.nativeElement.value = '';
    this.natacao2s.nativeElement.value = '';
    this.t12h.nativeElement.value = '';
    this.t12m.nativeElement.value = '';
    this.t12s.nativeElement.value = '';
    this.ciclismo2h.nativeElement.value = '';
    this.ciclismo2m.nativeElement.value = '';
    this.ciclismo2s.nativeElement.value = '';
    this.t22h.nativeElement.value = '';
    this.t22m.nativeElement.value = '';
    this.t22s.nativeElement.value = '';
    this.run2h.nativeElement.value = '';
    this.run2m.nativeElement.value = '';
    this.run2s.nativeElement.value = '';

    // Limpar tabela
    this.tempo1.natacao = '';
    this.tempo1.t1 = '';
    this.tempo1.ciclismo = '';
    this.tempo1.t2 = '';
    this.tempo1.run = '';

    this.tempo2.natacao = '';
    this.tempo2.t1 = '';
    this.tempo2.ciclismo = '';
    this.tempo2.t2 = '';
    this.tempo2.run = '';

    this.diferenca.natacao = '';
    this.diferenca.t1 = '';
    this.diferenca.ciclismo = '';
    this.diferenca.t2 = '';
    this.diferenca.run = '';

    this.tempoGanho = '';
    this.compararClicked = false;
  }

  getTimeClass(time1: number, time2: number): string {
    if (time1 > time2) {
      return 'text-danger';
    } else if (time1 < time2) {
      return 'text-success';
    } else {
      return '';
    }
  }

}