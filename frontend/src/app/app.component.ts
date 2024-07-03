import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, DatePipe, NgClass, NgOptimizedImage } from '@angular/common';
import { delay, interval, Observable, of, switchMap, takeWhile, timer } from 'rxjs';
import { Oscilloscope } from '@teropa/oscilloscope';
import { ValidityStatus } from '../interfaces/validity-status/validity-status.type';
import { Person } from '../interfaces/person/person.interface';
import { AmiraKouri } from '../data/amina-kouri';
import { Detail } from '../interfaces/detail/detail.interface';
import { IsabellaRossi } from '../data/isabella-rossi';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, AsyncPipe, DatePipe, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'd-fakeit';

  activePerson: Person = AmiraKouri;

  callDuration$: Observable<number> = timer(0, 1000);

  clientNameAuthenticated = false;

  processingFinished = false;

  emissions = 0;

  isEmitting = false;

  impersonatorCheckStatus: ValidityStatus = 'unknown';

  deepFakeCheckStatus: ValidityStatus = 'unknown';

  clientIndetificationCheckStatus: ValidityStatus = 'unknown';

  confidence = signal(0);

  @ViewChild('canvasWrapper') canvasWrapper!: ElementRef;

  textInput$ = this.setCouting();

  oscilloscope: Oscilloscope | null = null;

  ngAfterViewInit() {
    this.playAudio();
  }

  setActivePerson(person: 'AmiraKouri' | 'IsabelaRossi') {
    if (person === 'AmiraKouri') {
      this.activePerson = AmiraKouri;
    } else if (person === 'IsabelaRossi') {
      this.activePerson = IsabellaRossi;
    }

    this.clientNameAuthenticated = false;
    this.processingFinished = false;
    this.emissions = 0;

    this.impersonatorCheckStatus = 'unknown';
    this.deepFakeCheckStatus = 'unknown';
    this.clientIndetificationCheckStatus = 'unknown';

    this.confidence.set(0);

    this.callDuration$ = timer(0, 1000);
    this.textInput$ = this.setCouting();
    this.playAudio();
  }

  setCouting() {
    return interval(this.activePerson.interval).pipe(
      delay(this.activePerson.delay),
      takeWhile(() => this.emissions < this.activePerson.transcript.split(' ').length, true),
      switchMap((value: number) => {
        const correctInformations = this.activePerson.details.map(
          (field: Detail): boolean => field.validityStatus === 'valid'
        ).length;

        if (value % 3 === 0) {
          this.confidence.update((value: number) => (value += Math.floor(Math.random() * 3)));
        }

        if (value === 4) {
          this.deepFakeCheckStatus = 'valid';
          this.confidence.update((value: number) => (value += 20));
        }
        if (value === 12) {
          if (this.activePerson.name === IsabellaRossi.name) {
            this.impersonatorCheckStatus = 'invalid';
          } else {
            this.impersonatorCheckStatus = 'valid';
            this.confidence.update((value: number) => (value += 20));
          }
        }
        if (value === 18) {
          this.clientIndetificationCheckStatus = 'invalid';
        }
        if (this.emissions < this.activePerson.transcript.split(' ').length) {
          this.isEmitting = true;
          this.emissions++;
          return of(this.activePerson.transcript.split(' ').slice(0, this.emissions));
        } else {
          this.isEmitting = false;
          this.processingFinished = true;
          return of(this.activePerson.transcript.split(' '));
        }
      })
    );
  }

  playAudio() {
    const audio = document.getElementById('audio') as HTMLAudioElement;

    const audio2 = document.getElementById('audio2') as HTMLAudioElement;
    audio2.src = this.activePerson.audioFileUrl;
    audio2.load();
    audio2.play();

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    audio.src = this.activePerson.audioFileUrl;
    audio.load();
    audio.play();

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(audio);

    this.oscilloscope = new Oscilloscope(canvas, audioCtx, {
      fftSize: 16384,
      backgroundColor: '#f4f4f4',
      lineWidth: 2
    });
    this.oscilloscope.connect(source);
    this.oscilloscope.start();
    canvas.width = this.canvasWrapper.nativeElement.offsetWidth;
  }

  checkImportantData(word: string): boolean {
    if (word === 'Security' || word === 'number') {
      this.clientNameAuthenticated = true;
    }
    if (this.activePerson.text2highlight.includes(word)) {
      if (word === '1991.') {
        this.activePerson.details[0].validityStatus = 'valid';
      }
      if (word === '(ZR9023).') {
        this.activePerson.details[2].validityStatus = 'valid';
      }
      if (word === '(7561234567890)') {
        this.activePerson.details[5].validityStatus = 'valid';
      }

      if (word === 'Lee,') {
        this.activePerson.details[6].validityStatus = 'valid';
      }

      if (word === 'Rossi,') {
        this.activePerson.validityStatus = 'valid';
      }
      if (word === 'Curri') {
        this.activePerson.validityStatus = 'invalid';
      }
      return true;
    }
    return false;
  }
}
