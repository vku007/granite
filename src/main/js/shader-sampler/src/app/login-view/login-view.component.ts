import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {
  Subscription, Observable, of, interval, fromEvent, merge, forkJoin, race, zip, Subject, from,
  ConnectableObservable, ReplaySubject
} from "rxjs";
import {take, map, concatAll, multicast, first} from "rxjs/internal/operators";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.sass']
})
export class LoginViewComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  // use string, not String!
  returnUrl: string;
  error: string;


  // in constructor we inject service (Angular DI will do it for us, when component will be created)
  constructor(        private formBuilder: FormBuilder,
                      private route: ActivatedRoute,
                      private router: Router,
                      private authenticationService: AuthServiceService) {
    if (this.authenticationService.currentUserValue) {

      // redirect to home if already logged in
      this.router.navigate(['/']); //oops '/overview'?
    }
  }
  //is an Angular lifecycle hook that runs once after the component is created.
  // For more info on Angular lifecycle hooks see https://angular.io/guide/lifecycle-hooks.
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    //The return url property allows you to redirect the user back to the original page they requested before logging in.
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log("returnUrl :" + this.returnUrl);
    console.log("this.route.snapshot.url :" + this.route.snapshot.url);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log("onSubmit :");

    this.submitted = true; // is used in template logic

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    //noinspection TypeScriptValidateTypes,TypeScriptUnresolvedVariable
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first()) // it unsubscribes after first call
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]); todo fix it
          console.log("data:" + data);
          this.router.navigate(["overview"]); // to landing
        },
        error => {
          this.error = error;
          this.loading = false;
        });

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
    //it return LAST values, but in order of array
    //const forkJoined = forkJoin(observableA, observableB);
    //forkJoined.subscribe(this.getObserver("forkJoined "));

  //  forkJoined.subscribe(this.getObserver("FJ "))
//--- who is first

   // const raced = race(observableA, observableB);
   // raced.subscribe(this.getObserver("RACED "));
// ZIP waits for completes
//     const zipped = zip(observableA, observableB, (x, y) => {return " hm " + x + "|"+ y}).pipe(map((a) => { return a + "*"} ));
 //   zipped.subscribe(this.getObserver("ZIPPED "));
//============
    // example with mouse click
  //  const documentEvent = eventName =>
  //    fromEvent(document, eventName).pipe(
  //      map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
  //    );

 //   zip(documentEvent('mousedown'), documentEvent('mouseup')).subscribe(e =>
 //     console.log(JSON.stringify(e))
 //   );



   // const subject = new Subject();
   // subject.subscribe(this.getObserver("observer 1"));
   // subject.subscribe(this.getObserver("observer 2"));




  //  ------- interesting example with two subscribed observers and two observable.
    // observable B completes observer => both observers are closed by observable B
/*
    const subject = new Subject<any>();
    subject.subscribe(this.getObserver("observer 1"));


    observableA.subscribe(subject);

    observableB.subscribe(subject);
  */
   //-------- example with of and from:
    /*const observable = of(1,2,3,4,5);
    // it equals to
    const observable2 = from([1, 2, 3, 4, 5]);
    // but not to
    const observable3 = of([1, 2, 3, 4, 5]);

    observable3.subscribe(subject);
    */
    // trivial subscribing to observable, so we essentially just converted a unicast Observable execution to multicast,
    // through the Subject.
   /* const observable = from([1, 2, 3]);
    observable.subscribe(subject);
    */

     const subject = new Subject();
     subject.next(1);
     subject.subscribe(this.getObserver("observer 1"));
     subject.next(2);
     subject.subscribe(this.getObserver("observer 2"));
     subject.next(3);
     subject.next(4);

   }


  getObserver(lable: String) {
    return (value => {
      console.log(lable + ' value: ' + value);
    });
  }
}
