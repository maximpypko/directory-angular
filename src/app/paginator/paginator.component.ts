import { Component,  AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements AfterViewInit  {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
    length = 1000;
    pageSize = 6;
    pageSizeOptions: number[] = [6];

  ngAfterViewInit() {
    this.paginator.page.subscribe(
      (event) => console.log(event)
    );
  }
}
