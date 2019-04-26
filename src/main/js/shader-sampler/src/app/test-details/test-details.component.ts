import {Component, OnInit, Input} from '@angular/core';
import {DynamoTest} from "../dynamo-test";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {DynamoTestService} from "../dynamo-test.service";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.sass']
})
export class TestDetailsComponent implements OnInit {

  output:string = "empty";

  test: DynamoTest;
  constructor(private route: ActivatedRoute,
              private testService: DynamoTestService,
              private backService: BackendService,
              private location: Location) { }

  ngOnInit() {
    this.getTest();
  }

  getTest(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.testService.getTest(id)
      .subscribe(test => this.test = test);
  }

  makeCall(): void {
    this.backService.getOutput(this.test.link, {id: "1", desc: "desc2222"}).subscribe(output => this.output = output);

  }

  goBack(): void {
    this.location.back();
  }

}
