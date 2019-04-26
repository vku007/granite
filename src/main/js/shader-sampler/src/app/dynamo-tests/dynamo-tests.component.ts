import { Component, OnInit } from '@angular/core';
import {DynamoTest} from "../dynamo-test";
import {DynamoTestService} from "../dynamo-test.service";

@Component({
  selector: 'app-dynamo-tests',
  templateUrl: './dynamo-tests.component.html',
  styleUrls: ['./dynamo-tests.component.sass']
})
export class DynamoTestsComponent implements OnInit {


  testList: DynamoTest[];

  constructor(private dynamoTestService: DynamoTestService) { }

  ngOnInit() {
    this.getTests();
  }

  getTests(): void {
    this.dynamoTestService.getTestList().subscribe( list => this.testList = list);
  }

}
