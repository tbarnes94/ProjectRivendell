import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  navLinks: Array<object> = [
    {
      path: 'view-data',
      label: 'VIEW DATA'
    },
    {
      path: 'update-data',
      label: 'UPDATE DATA'
    },
    {
      path: 'generate-report',
      label: "EXPORT TO XLS"
    }
  ];

}
