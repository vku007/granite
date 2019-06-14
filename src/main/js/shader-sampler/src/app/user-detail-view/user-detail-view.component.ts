import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail-view',
  templateUrl: './user-detail-view.component.html',
  styleUrls: ['./user-detail-view.component.sass']
})
export class UserDetailViewComponent implements OnInit {
  userCaption:string = "empty";

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.userCaption = this.route.snapshot.paramMap.get('id');
  }

  goBack(): void {
    this.location.back();
  }



}
