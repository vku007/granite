import { Component, OnInit, Input } from '@angular/core';
import {Program} from "../program";


@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.sass']
})
export class ProgramDetailComponent implements OnInit {

  @Input() program: Program;

  constructor() { }

  ngOnInit() {
  }

}
