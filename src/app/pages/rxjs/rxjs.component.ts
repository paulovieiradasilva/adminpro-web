import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regressaObservable().pipe(
      retry(2)
    )
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error em obs ', error),
      () => console.log('O obs terminou')
    );


  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('Subscribe, finalizado!');
    this.subscription.unsubscribe();
  }

  regressaObservable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;

      let interval = setInterval(() => {

        contador ++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        /* if (contador === 3) {
          clearInterval(interval);
          observer.complete();
        }

        if (contador === 2) {
          clearInterval(interval);
          observer.error('Auxilio!');
        } */

      }, 1000);

    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {

        if ((valor % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }

      })
    );

  }

}
