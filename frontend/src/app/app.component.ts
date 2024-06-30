import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, DatePipe, NgClass, NgOptimizedImage } from '@angular/common';
import { delay, interval, Observable, of, switchMap, takeWhile, timer } from 'rxjs';
import { Oscilloscope } from '@teropa/oscilloscope';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, AsyncPipe, DatePipe, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'd-fakeit';

  callDuration$: Observable<number> = timer(0, 1000);

  inputString =
    'Hi, this is Isabella Rossi, managed by James Lee, account number Z R nine zero two three (ZR9023). I need to make sure no records' +
    ' are kept' +
    ' for my recent transactions.';

  dataName = {
    name: 'Isabella Rossi',
    profession: 'Art Dealer',
    validityStatus: 'unknown'
  };

  dataFields = [
    {
      name: 'Birthday',
      value: '7th March 1978',
      validityStatus: 'unknown'
    },
    {
      name: 'Marital status',
      value: 'Widowed',
      validityStatus: 'unknown'
    },
    {
      name: 'Account Number',
      value: 'ZR9023',
      validityStatus: 'unknown'
    },
    {
      name: 'Tax Residency',
      value: ' Russia',
      validityStatus: 'unknown'
    },
    {
      name: 'Net worth in milions',
      value: '$650M',
      validityStatus: 'unknown'
    },
    {
      name: 'Social Security Number',
      value: '7566987517099',
      validityStatus: 'unknown'
    },
    {
      name: 'Relationship manager',
      value: 'James Lee',
      validityStatus: 'unknown'
    },
    {
      name: 'Education',
      value: 'Ph.D. in Chemistry',
      validityStatus: 'unknown'
    }
  ];

  clientNameAuthenticated = false;

  importantDataArray = ['Isabella', 'Rossi,', '(ZR9023).', 'James', 'Lee,'];

  emissions = 0;

  isEmitting = false;

  impersonatorCheckStatus = 'unknown';

  deepFakeCheckStatus = 'unknown';

  clientIndetificationCheckStatus = 'unknown';

  confidence = 0;

  @ViewChild('canvasWrapper') canvasWrapper!: ElementRef;

  processingFinished = false;

  textInput$ = interval(700).pipe(
    delay(2500),
    takeWhile(() => this.emissions < this.inputString.split(' ').length, true),
    switchMap((value: number) => {
      const correctInformations = this.dataFields.map(
        (field) => field.validityStatus === 'valid'
      ).length;

      if (value % 3 === 0) {
        this.confidence += Math.floor(Math.random() * 3);
      }

      if (value === 4) {
        this.deepFakeCheckStatus = 'valid';
        this.confidence += 20;
      }
      if (value === 12) {
        this.impersonatorCheckStatus = 'invalid';
        // this.confidence += 20;
      }
      if (value === 18) {
        this.clientIndetificationCheckStatus = 'valid';
        this.confidence += 15;
      }
      if (this.emissions < this.inputString.split(' ').length) {
        this.isEmitting = true;
        this.emissions++;
        return of(this.inputString.split(' ').slice(0, this.emissions));
      } else {
        this.isEmitting = false;
        this.processingFinished = true;
        return of(this.inputString.split(' '));
      }
    })
  );

  async ngAfterViewInit() {
    const audio = document.getElementById('audio') as HTMLAudioElement;

    const audio2 = document.getElementById('audio2') as HTMLAudioElement;
    audio2.src = 'fake.ogg';
    audio2.load();
    audio2.play();

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    audio.src = 'fake.ogg';
    audio.load();
    audio.play();

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(audio);

    let oscilloscope: Oscilloscope = new Oscilloscope(canvas, audioCtx, {
      fftSize: 16384,
      backgroundColor: '#f4f4f4',
      lineWidth: 2
    });
    oscilloscope.connect(source);
    oscilloscope.start();
    canvas.width = this.canvasWrapper.nativeElement.offsetWidth;
  }

  checkImportantData(word: string): boolean {
    if (word === 'number') {
      this.clientNameAuthenticated = true;
    }
    if (this.importantDataArray.includes(word)) {
      if (word === '(ZR9023).') {
        this.dataFields[2].validityStatus = 'valid';
      }

      if (word === 'Lee,') {
        this.dataFields[6].validityStatus = 'valid';
      }
      if (word === 'Rossi,') {
        this.dataName.validityStatus = 'valid';
      }
      return true;
    }
    return false;
  }
}
