import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AppApiService } from '../services/appAPI.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preTimeTest',
  templateUrl: './preTimeTest.component.html',
  styleUrls: ['./preTimeTest.component.scss']
})
export class PreTimeTestComponent implements OnInit {
  tempos: any[] = [];
  selectedTempo: any;
  selectedTempoId: number = 0;

  tipoID: number = 0;
  triatlo: string[] = ["Triatlo Sprint", "Triatlo Olímpico", "Meio-Ironman (70.3)", "Ironman (Full Distance)"];
  triatlo_sprint: string[] = ["750m", "20km", "5km"];
  triatlo_olimpico: string[] = ["1500m", "40km", "10km"];
  triatlo_meio_ironman: string[] = ["1,9km", "90km", "21,1km"];
  triatlo_ironman: string[] = ["3,8km", "180km", "42,2km"];

  distancias: string[] = this.triatlo_olimpico;
  tipoTriatloNome: string = '';

  tempoGanho: any = {};
  tempo1: any = {};
  tempo2: any = {};
  diferenca: any = {};
  errorMessage: string = "";
  compararClicked: boolean = false;


  // Referenciar os inputs 
  @ViewChild('nome') nome!: ElementRef;
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
    this.loadTimes();
  }

  constructor(private apiService: AppApiService, private router: Router) { }
  loadTimes() {
    this.apiService.getAll().subscribe(
      (response: any) => {
        this.tempos = response;
        //console.log(this.tempos); DEBUG ARRAY DOS TEMPOS
      },
      (error: any) => {
        console.error('Erro ao carregar tempos', error);
      }
    );
  }

  // Atualizar os brakets do html
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
    this.errorMessage = '';


    if (!this.selectedTempo) {
      this.errorMessage = 'Please select a time before comparing.';
      return false;
    }

    const inputs = [

      { value: this.natacao2h.nativeElement.value, min: 0, max: 48, name: 'Swimming Hours' },
      { value: this.natacao2m.nativeElement.value, min: 0, max: 59, name: 'Swimming Minutes' },
      { value: this.natacao2s.nativeElement.value, min: 0, max: 59, name: 'Swimming Seconds' },
      { value: this.t12h.nativeElement.value, min: 0, max: 48, name: 'T1 Hours' },
      { value: this.t12m.nativeElement.value, min: 0, max: 59, name: 'T1 Minutes' },
      { value: this.t12s.nativeElement.value, min: 0, max: 59, name: 'T1 Seconds' },
      { value: this.ciclismo2h.nativeElement.value, min: 0, max: 48, name: 'Cycling Hours' },
      { value: this.ciclismo2m.nativeElement.value, min: 0, max: 59, name: 'Cycling Minutes' },
      { value: this.ciclismo2s.nativeElement.value, min: 0, max: 59, name: 'Cycling Seconds' },
      { value: this.t22h.nativeElement.value, min: 0, max: 48, name: 'T2 Hours' },
      { value: this.t22m.nativeElement.value, min: 0, max: 59, name: 'T2 Minutes' },
      { value: this.t22s.nativeElement.value, min: 0, max: 59, name: 'T2 Seconds' },
      { value: this.run2h.nativeElement.value, min: 0, max: 48, name: 'Running Hours' },
      { value: this.run2m.nativeElement.value, min: 0, max: 59, name: 'Running Minutes' },
      { value: this.run2s.nativeElement.value, min: 0, max: 59, name: 'Running Seconds' },
    ];


    for (let input of inputs) {
      const value = parseInt(input.value);
      if (isNaN(value) || value < input.min || value > input.max) {
        this.errorMessage = `${input.name} of your personal time must be between ${input.min} and ${input.max}.`;
        return false;
      }
    }
    return true;


  }

  // Comparar os tempos e fazer os calculos para a tabela 
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

  //Formatar o tempo normal
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
    //Limpar mesmo que o elemento seja nulo 
    const clearElement = (element: any) => {
      if (element && element.nativeElement) {
        element.nativeElement.value = '';
      }
    };

    // Limpar inputs para tempo1
    clearElement(this.natacao1h);
    clearElement(this.natacao1m);
    clearElement(this.natacao1s);
    clearElement(this.t11h);
    clearElement(this.t11m);
    clearElement(this.t11s);
    clearElement(this.ciclismo1h);
    clearElement(this.ciclismo1m);
    clearElement(this.ciclismo1s);
    clearElement(this.t21h);
    clearElement(this.t21m);
    clearElement(this.t21s);
    clearElement(this.run1h);
    clearElement(this.run1m);
    clearElement(this.run1s);

    // Limpar inputs para tempo2
    clearElement(this.natacao2h);
    clearElement(this.natacao2m);
    clearElement(this.natacao2s);
    clearElement(this.t12h);
    clearElement(this.t12m);
    clearElement(this.t12s);
    clearElement(this.ciclismo2h);
    clearElement(this.ciclismo2m);
    clearElement(this.ciclismo2s);
    clearElement(this.t22h);
    clearElement(this.t22m);
    clearElement(this.t22s);
    clearElement(this.run2h);
    clearElement(this.run2m);
    clearElement(this.run2s);

    // Limpar tabela
    this.tempo1 = {
      natacao: '',
      t1: '',
      ciclismo: '',
      t2: '',
      run: ''
    };

    this.tempo2 = {
      natacao: '',
      t1: '',
      ciclismo: '',
      t2: '',
      run: ''
    };

    this.diferenca = {
      natacao: '',
      t1: '',
      ciclismo: '',
      t2: '',
      run: ''
    };

    this.tempoGanho = '';
    this.compararClicked = false;
  }

  onTimeChange(event: any) {
    const selectedTempoId = parseInt(event.target.value, 10);
    this.selectedTempoId = selectedTempoId;
    //console.log(selectedTempoId); DEBUG ID TEMPO
    this.selectedTempo = this.tempos.find(tempo => tempo.ID === selectedTempoId);

    if (this.selectedTempo) {
      this.tipoID = this.selectedTempo.TipoID;

      switch (this.tipoID) {
        case 1:
          this.tipoTriatloNome = "Triatlo Sprint";
          this.distancias = this.triatlo_sprint;
          break;
        case 2:
          this.tipoTriatloNome = "Triatlo Olímpico";
          this.distancias = this.triatlo_olimpico;
          break;
        case 3:
          this.tipoTriatloNome = "Meio-Ironman (70.3)";
          this.distancias = this.triatlo_meio_ironman;
          break;
        case 4:
          this.tipoTriatloNome = "Ironman (Full Distance)";
          this.distancias = this.triatlo_ironman;
          break;
        default:
          this.tipoTriatloNome = "";
          this.distancias = [];
          break;
      }


      //console.log(this.tipoTriatloNome); DEBUG TEMPO SELECIONADO


      // Atualizar o modelo do segundo select
      this.updateSecondSelectModel(this.tipoTriatloNome);

      if (this.tipoID !== 0 && this.tipoTriatloNome) {
        const selectElement = document.getElementById('inputGroupSelect02') as HTMLSelectElement;
        selectElement.value = this.tipoTriatloNome;
      }

      if (this.nome && this.nome.nativeElement) {
        this.nome.nativeElement.value = this.selectedTempo.Nome;
      }

      if (this.natacao1h && this.natacao1h.nativeElement) {
        this.natacao1h.nativeElement.value = this.selectedTempo.NatacaoHoras;
      }

      if (this.natacao1m && this.natacao1m.nativeElement) {
        this.natacao1m.nativeElement.value = this.selectedTempo.NatacaoMinutos;
      }

      if (this.natacao1s && this.natacao1s.nativeElement) {
        this.natacao1s.nativeElement.value = this.selectedTempo.NatacaoSegundos;
      }

      if (this.t11h && this.t11h.nativeElement) {
        this.t11h.nativeElement.value = this.selectedTempo.T1Horas;
      }

      if (this.t11m && this.t11m.nativeElement) {
        this.t11m.nativeElement.value = this.selectedTempo.T1Minutos;
      }

      if (this.t11s && this.t11s.nativeElement) {
        this.t11s.nativeElement.value = this.selectedTempo.T1Segundos;
      }

      if (this.ciclismo1h && this.ciclismo1h.nativeElement) {
        this.ciclismo1h.nativeElement.value = this.selectedTempo.CiclismoHoras;
      }

      if (this.ciclismo1m && this.ciclismo1m.nativeElement) {
        this.ciclismo1m.nativeElement.value = this.selectedTempo.CiclismoMinutos;
      }

      if (this.ciclismo1s && this.ciclismo1s.nativeElement) {
        this.ciclismo1s.nativeElement.value = this.selectedTempo.CiclismoSegundos;
      }

      if (this.t21h && this.t21h.nativeElement) {
        this.t21h.nativeElement.value = this.selectedTempo.T2Horas;
      }

      if (this.t21m && this.t21m.nativeElement) {
        this.t21m.nativeElement.value = this.selectedTempo.T2Minutos;
      }

      if (this.t21s && this.t21s.nativeElement) {
        this.t21s.nativeElement.value = this.selectedTempo.T2Segundos;
      }

      if (this.run1h && this.run1h.nativeElement) {
        this.run1h.nativeElement.value = this.selectedTempo.CorridaHoras;
      }

      if (this.run1m && this.run1m.nativeElement) {
        this.run1m.nativeElement.value = this.selectedTempo.CorridaMinutos;
      }

      if (this.run1s && this.run1s.nativeElement) {
        this.run1s.nativeElement.value = this.selectedTempo.CorridaSegundos;
      }

    }

  }
  updateSecondSelectModel(value: string) {
    this.tipoTriatloNome = value;
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
