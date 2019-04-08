import { Injectable } from '@angular/core';
import {Program} from "./program";
import {PROGRAMS} from "./mock-program";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private messageService: MessageService) { }

  getPrograms(): Observable<Program[]> {
    this.messageService.add('ProgramService: fetched programs');
    return of(PROGRAMS);
  }
}
