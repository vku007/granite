import { Component, OnInit } from '@angular/core';
import {Program} from '../program';
import {ProgramService} from "../program.service";



@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.sass']
})
export class ProgramsComponent implements OnInit {

  programs: Program[];

  selectedProgram: Program;

  onSelect(program: Program): void {
    this.selectedProgram = program;
  }

  constructor(private programService: ProgramService) { }

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms(): void {
    this.programService.getPrograms().subscribe( programs => this.programs = programs);
  }

}
