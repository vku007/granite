import { Injectable } from '@angular/core';

import {DynamoTest} from "./dynamo-test";



// GUI side for stubbing http service
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService    {
//It natively handles URI patterns in the form :base/:collectionName/:id?
// tests show fast approach
  createDb() {
    const tests: DynamoTest[] = [
      {id: 11, name: "QQQ(re)init DB", link: "/tstDbSetup", desc: ""},
      {id: 12, name: "fill simple data", link: "/tstIndx", desc: ""},
      {id: 13, name: "simple query test", link: "/tstInserts", desc: ""},
    ];

    // in case numerous collections we could just to add additional collection
    const calls: any[] = [
      "",
      {id: "tstDbSetup", output: "test output1"},
      {id: 2, output: "test output2"},
    ];

    return {tests, calls};
  }


  constructor() { }

  // a bit more complicated approach: override post method:
/*
  post(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      console.log('HTTP POST override');
      if (reqInfo.collectionName === 'calls') {
        return this.getCallResponse(reqInfo);
      }
      if (reqInfo.collectionName === 'calls') {
        return this.getCallResponse(reqInfo);
      }

      console.log('HTTP POST override: reqInfo = ' + reqInfo.url);
      //api/users/authenticate
      return undefined; // let the default GET handle all others

    });
  }

  private getCallResponse(reqInfo: RequestInfo) {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const data = "just test";

      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? { data } : data,
          status: STATUS.OK
        } :
        {
          body: { error: `error` },
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, reqInfo);
  }


  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }

  // override for new  id
  genId(tests: any): number {
    return tests.length > 0 ? Math.max(...tests.map(test => test.id)) + 1 : 11;
  }
  */
}
