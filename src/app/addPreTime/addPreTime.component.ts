import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppApiService } from '../services/appAPI.service';


@Component({
  selector: 'app-addPreTime',
  templateUrl: './addPreTime.component.html',
  styleUrls: ['./addPreTime.component.scss']
})
export class AddPreTimeComponent {

  constructor(private apiService: AppApiService) { }

  triatlo: string[] = ["Triatlo Sprint", "Triatlo Olímpico", "Meio-Ironman (70.3)", "Ironman (Full Distance)"];
  triatlo_sprint: string[] = ["750m", "20km", "5km"];
  triatlo_olimpico: string[] = ["1500m", "40km", "10km"];
  triatlo_meio_ironman: string[] = ["1,9km", "90km", "21,1km"];
  triatlo_ironman: string[] = ["3,8km", "180km", "42,2km"];
  triatlo_id: number[] = [1, 2, 3, 4];

  tipoID: number=0;
  tempo1: any = {};
  diferenca: any = {};
  errorMessage: string = "";
  total: any = {};

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

  // Atualizar os brakets do html
  distancias: string[] = this.triatlo_olimpico;
  onTriatloChange(event: any) {
    const selectedTriatlo = event.target.value;

    switch (selectedTriatlo) {
      case 'Triatlo Sprint':
        this.distancias = this.triatlo_sprint;
        this.tipoID = this.triatlo_id[0];
        break;
      case 'Triatlo Olímpico':
        this.distancias = this.triatlo_olimpico;
        this.tipoID = this.triatlo_id[1];
        break;
      case 'Meio-Ironman (70.3)':
        this.distancias = this.triatlo_meio_ironman;
        this.tipoID = this.triatlo_id[2];
        break;
      case 'Ironman (Full Distance)':
        this.distancias = this.triatlo_ironman;
        this.tipoID = this.triatlo_id[3];
        break;
      default:
        this.distancias = [];
        break;
    }
  }

  // Validar se todos os campos foram preenchidos
  validateInputs(): boolean {
    return this.natacao1h.nativeElement.value && this.natacao1m.nativeElement.value && this.natacao1s.nativeElement.value &&
      this.t11h.nativeElement.value && this.t11m.nativeElement.value && this.t11s.nativeElement.value &&
      this.ciclismo1h.nativeElement.value && this.ciclismo1m.nativeElement.value && this.ciclismo1s.nativeElement.value &&
      this.t21h.nativeElement.value && this.t21m.nativeElement.value && this.t21s.nativeElement.value &&
      this.run1h.nativeElement.value && this.run1m.nativeElement.value && this.run1s.nativeElement.value;
  }

  // Passar tudo para segundos
  getTime(hoursInput: ElementRef, minutesInput: ElementRef, secondsInput: ElementRef): number {
    const hours = parseInt(hoursInput.nativeElement.value) || 0;
    const minutes = parseInt(minutesInput.nativeElement.value) || 0;
    const seconds = parseInt(secondsInput.nativeElement.value) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }

  formatTotalTime(): string {
    const totalSeconds =
      this.getTime(this.natacao1h, this.natacao1m, this.natacao1s) +
      this.getTime(this.t11h, this.t11m, this.t11s) +
      this.getTime(this.ciclismo1h, this.ciclismo1m, this.ciclismo1s) +
      this.getTime(this.t21h, this.t21m, this.t21s) +
      this.getTime(this.run1h, this.run1m, this.run1s);

    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  cleanup() {
    // Limpar inputs para tempo
    this.nome.nativeElement.value = "";
    this.natacao1h.nativeElement.value = "";
    this.natacao1m.nativeElement.value = "";
    this.natacao1s.nativeElement.value = "";
    this.t11h.nativeElement.value = "";
    this.t11m.nativeElement.value = "";
    this.t11s.nativeElement.value = "";
    this.ciclismo1h.nativeElement.value = "";
    this.ciclismo1m.nativeElement.value = "";
    this.ciclismo1s.nativeElement.value = "";
    this.t21h.nativeElement.value = "";
    this.t21m.nativeElement.value = "";
    this.t21s.nativeElement.value = "";
    this.run1h.nativeElement.value = "";
    this.run1m.nativeElement.value = "";
    this.run1s.nativeElement.value = "";
  }

  addTime() {
    if (!this.validateInputs()) {
      this.errorMessage = 'Todos os campos de tempo são obrigatórios preencher.';
      return;
    }

    const data = {
      Nome: this.nome.nativeElement.value,
      TipoID: this.tipoID,
      NatacaoHoras: this.natacao1h.nativeElement.value,
      NatacaoMinutos: this.natacao1m.nativeElement.value,
      NatacaoSegundos: this.natacao1s.nativeElement.value,
      T1Horas: this.t11h.nativeElement.value,
      T1Minutos: this.t11m.nativeElement.value,
      T1Segundos: this.t11s.nativeElement.value,
      CiclismoHoras: this.ciclismo1h.nativeElement.value,
      CiclismoMinutos: this.ciclismo1m.nativeElement.value,
      CiclismoSegundos: this.ciclismo1s.nativeElement.value,
      T2Horas: this.t21h.nativeElement.value,
      T2Minutos: this.t21m.nativeElement.value,
      T2Segundos: this.t21s.nativeElement.value,
      CorridaHoras: this.run1h.nativeElement.value,
      CorridaMinutos: this.run1m.nativeElement.value,
      CorridaSegundos: this.run1s.nativeElement.value,
      Total: this.formatTotalTime()
    };

    this.apiService.create(data).subscribe(response => {
      console.log('Dados inseridos com sucesso', response);
      this.cleanup();
    }, error => {
      console.error('Erro ao inserir dados', error);
      this.errorMessage = 'Erro ao inserir dados';
    });
  }

  
}
