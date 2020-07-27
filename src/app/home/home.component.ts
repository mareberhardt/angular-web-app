
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from './../api.service';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('toggleGroup') toggleGroup: MatButtonToggleGroup;
  products: any[] = [];
  sortedProducts: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.sendGetRequest()
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(
        (res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        }
      );
  }

  public firstPage() {
    this.reset();
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }

  public previousPage() {
    this.reset();
    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.prev)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }

  public nextPage() {
    this.reset();
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.next)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        })
      }
  }

  public lastPage() {
    this.reset();
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }

  sortProducts(sort: any) {
    const data = this.products.slice();
    if (!sort) {
       this.products = data;
       return;
    }
    this.products = data.sort((a, b) => {
      const isAsc = true;
      switch (sort) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'price': return this.compare(a.price, b.price, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  reset() {
    this.toggleGroup.value = '';
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
