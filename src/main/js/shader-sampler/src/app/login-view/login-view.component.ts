import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {Subscription, Observable, of, interval, fromEvent, merge, forkJoin, race, zip} from "rxjs";
import {take, map, concatAll} from "rxjs/internal/operators";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.sass']
})
export class LoginViewComponent implements OnInit {

  constructor(private authenticationService: AuthServiceService) { }

  ngOnInit() {
  }

  goLogout() {
    this.authenticationService.logout();
    // redirect?
  }

  goLogin() {
    //Observables are declarative—that is, you define a function for publishing values,
    // but it is not executed until a consumer subscribes to it.
    let s: Subscription;
    s = this.authenticationService.login("name", "pass").subscribe();
  }

  doTest() {
    let values =[];
    //noinspection TypeScriptValidateTypes
    //let source  = of(1,2,3);

    let sourceInterval  = interval(1000).pipe(take(5));

    let observer = (value => {
      console.log('value: ' + value);
    });

    //source.subscribe(this.getObserver("1"));
   // sourceInterval.subscribe(this.getObserver("2"));


    const higherOrder = sourceInterval.pipe(
      map(ev => interval(100).pipe(take(ev))),
    );

    //higherOrder.subscribe(this.getObserver("simple"));

    const firstOrder = higherOrder.pipe(concatAll());
    //firstOrder.subscribe(this.getObserver("Interval "));

    this.toTest2();
  }

  // test of 2 custom observable
  toTest2() {
    let observableA = new Observable(observer => {
      observer.next("from A: 1");
      setTimeout(() => {
        observer.next("from A: 2");
        setTimeout(() => {
          observer.next("from A: 3");
          observer.next("from A: 4");
          observer.complete();
        }, 5000)
      }, 2000);
    });
    let observableB = new Observable(observer => {
        observer.next("from B: 1");
        setTimeout(() => {
          observer.next("from B: 2");
          setTimeout(() => {
            observer.next( "from B: 3");
            observer.complete();
          }, 3000)
        }, 3000);
    });

    //const merged = merge(observableA, observableB);

    //merged.subscribe(this.getObserver("merged "))

//----
   // it return LAST values, but in order of array
   // const forkJoined = forkJoin(observableA, observableB);

  //  forkJoined.subscribe(this.getObserver("FJ "))
//---

   // const raced = race(observableA, observableB);
   // raced.subscribe(this.getObserver("RACED "));
// ZIP waits for completes
//     const zipped = zip(observableA, observableB, (x, y) => {return " hm " + x + "|"+ y}).pipe(map((a) => { return a + "*"} ));
 //   zipped.subscribe(this.getObserver("ZIPPED "));

    const documentEvent = eventName =>
      fromEvent(document, eventName).pipe(
        map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
      );

    zip(documentEvent('mousedown'), documentEvent('mouseup')).subscribe(e =>
      console.log(JSON.stringify(e))
    );
  }

  getObserver(lable: String) {
    return (value => {
      console.log(lable +' value: ' + value);
    });
}

}
