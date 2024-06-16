import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AppApiService } from '../services/appAPI.service';
import { Router } from '@angular/router';
import anime from 'animejs/lib/anime.es.js'

@Component({
  selector: 'app-editDeleteTime',
  templateUrl: './editDeleteTime.component.html',
  styleUrls: ['./editDeleteTime.component.scss']
})
export class EditDeleteTimeComponent implements OnInit {
  tempos: any[] = [];
  selectedTempo: any;
  selectedTempoId: number = 0;

  triatlo: string[] = ["Sprint Triathlon", "Olympic Triathlon", "Half-Ironman (70.3)", "Ironman (Full Distance)"];
  triatlo_sprint: string[] = ["750m", "20km", "5km"];
  triatlo_olimpico: string[] = ["1500m", "40km", "10km"];
  triatlo_meio_ironman: string[] = ["1,9km", "90km", "21,1km"];
  triatlo_ironman: string[] = ["3,8km", "180km", "42,2km"];
  triatlo_id: number[] = [1, 2, 3, 4];

  tipoID: number = 0;
  tempo1: any = {};
  diferenca: any = {};
  errorMessage: string = "";
  total: any = {};
  distancias: string[] = this.triatlo_olimpico;
  tipoTriatloNome: string = '';

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

  constructor(private apiService: AppApiService, private router: Router) { }

  ngOnInit() {
    this.loadTimes();
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

  onTimeChange(event: any) {
    const selectedTempoId = parseInt(event.target.value, 10);
    this.selectedTempoId = selectedTempoId;
    //console.log(selectedTempoId); DEBUG ID TEMPO
    this.selectedTempo = this.tempos.find(tempo => tempo.ID === selectedTempoId);

    if (this.selectedTempo) {
      this.tipoID = this.selectedTempo.TipoID;

      switch (this.tipoID) {
        case 1:
          this.tipoTriatloNome = "Sprint Triathlon";
          this.distancias = this.triatlo_sprint;
          break;
        case 2:
          this.tipoTriatloNome = "Olympic Triathlon";
          this.distancias = this.triatlo_olimpico;
          break;
        case 3:
          this.tipoTriatloNome = "Half-Ironman (70.3)";
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

  validateInputs(): boolean {
    const inputs = [
      { value: this.natacao1h.nativeElement.value, min: 0, max: 48, name: 'Swimming Hours' },
      { value: this.natacao1m.nativeElement.value, min: 0, max: 59, name: 'Swimming Minutes' },
      { value: this.natacao1s.nativeElement.value, min: 0, max: 59, name: 'Swimming Seconds' },
      { value: this.t11h.nativeElement.value, min: 0, max: 48, name: 'T1 Hours' },
      { value: this.t11m.nativeElement.value, min: 0, max: 59, name: 'T1 Minutes' },
      { value: this.t11s.nativeElement.value, min: 0, max: 59, name: 'T1 Seconds' },
      { value: this.ciclismo1h.nativeElement.value, min: 0, max: 48, name: 'Cycling Hours' },
      { value: this.ciclismo1m.nativeElement.value, min: 0, max: 59, name: 'Cycling Minutes' },
      { value: this.ciclismo1s.nativeElement.value, min: 0, max: 59, name: 'Cycling Seconds' },
      { value: this.t21h.nativeElement.value, min: 0, max: 48, name: 'T2 Hours' },
      { value: this.t21m.nativeElement.value, min: 0, max: 59, name: 'T2 Minutes' },
      { value: this.t21s.nativeElement.value, min: 0, max: 59, name: 'T2 Seconds' },
      { value: this.run1h.nativeElement.value, min: 0, max: 48, name: 'Running Hours' },
      { value: this.run1m.nativeElement.value, min: 0, max: 59, name: 'Running Minutes' },
      { value: this.run1s.nativeElement.value, min: 0, max: 59, name: 'Running Seconds' },
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
  editTime() {

    if (!this.validateInputs()) {
      return;
    }
    const data = {
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
      Total: this.formatTotalTime(),
    };

    const tempoId = this.selectedTempo.ID;

    this.apiService.update(tempoId, data).subscribe(response => {
      console.log('Dados atualizados com sucesso', response);
      alert('Dados atualizados com sucesso');
      this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Forçar a atualização da rota
      this.router.onSameUrlNavigation = 'reload'; // Recarregar a pagina atual
      this.router.navigate([this.router.url]);
    }, error => {
      console.error('Erro ao atualizar dados', error);
      this.errorMessage = 'Erro ao atualizar dados';
    });
  }

  deleteTime(): void {
    if (this.selectedTempo) {
      const tempoId = this.selectedTempo.ID;
      this.apiService.delete(tempoId).subscribe((response) => {
        this.tempos = this.tempos.filter(t => t.ID !== tempoId);
        console.log('Dados eliminados com sucesso', response);
        alert('Dados eliminados com sucesso')
        this.cleanup();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Forçar a atualização da rota
        this.router.onSameUrlNavigation = 'reload'; // Recarregar a pagina atual
        this.router.navigate([this.router.url]);
      }, error => {
        console.error('Erro ao eliminar dados', error);
        this.errorMessage = 'Erro ao eliminar dados';
      });
    } else {
      this.errorMessage = 'Nenhum tempo selecionado para deletar';
    }
  }




  cleanup(): void {

    if (this.nome && this.nome.nativeElement) {
      this.nome.nativeElement.value = '';
    }

    if (this.natacao1h && this.natacao1h.nativeElement) {
      this.natacao1h.nativeElement.value = '';
    }

    if (this.natacao1m && this.natacao1m.nativeElement) {
      this.natacao1m.nativeElement.value = '';
    }

    if (this.natacao1s && this.natacao1s.nativeElement) {
      this.natacao1s.nativeElement.value = '';
    }

    if (this.t11h && this.t11h.nativeElement) {
      this.t11h.nativeElement.value = '';
    }

    if (this.t11m && this.t11m.nativeElement) {
      this.t11m.nativeElement.value = '';
    }

    if (this.t11s && this.t11s.nativeElement) {
      this.t11s.nativeElement.value = '';
    }

    if (this.ciclismo1h && this.ciclismo1h.nativeElement) {
      this.ciclismo1h.nativeElement.value = '';
    }

    if (this.ciclismo1m && this.ciclismo1m.nativeElement) {
      this.ciclismo1m.nativeElement.value = '';
    }

    if (this.ciclismo1s && this.ciclismo1s.nativeElement) {
      this.ciclismo1s.nativeElement.value = '';
    }

    if (this.t21h && this.t21h.nativeElement) {
      this.t21h.nativeElement.value = '';
    }

    if (this.t21m && this.t21m.nativeElement) {
      this.t21m.nativeElement.value = '';
    }

    if (this.t21s && this.t21s.nativeElement) {
      this.t21s.nativeElement.value = '';
    }
    if (this.run1h && this.run1h.nativeElement) {
      this.run1h.nativeElement.value = '';
    }
    if (this.run1m && this.run1m.nativeElement) {
      this.run1m.nativeElement.value = '';
    }
    if (this.run1s && this.run1s.nativeElement) {
      this.run1s.nativeElement.value = '';
    }
  }
}
