import {Component,OnInit, Input, SimpleChanges, OnChanges, EventEmitter, ChangeDetectorRef} from '@angular/core';

import { postInput } from '../../../post-details/postInput';
import { ArticleListConfig, config2resp } from './article-list-config.model';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
// import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.css'],
  templateUrl: './article-list.component.html'
})

export class ArticleListComponent implements OnChanges{
  posts: Array<postInput> = [];
  userId: string;
  query: ArticleListConfig;
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  constructor ( //public dialog: MatDialog,
                private cd: ChangeDetectorRef,
                private http:HttpClient ) {
    this.userId = sessionStorage.getItem('userId')
  }

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      console.log("get config",config)
      this.query = config;
      // this.currentPage = 1
      this.currentPage = this.query.page
      // this.cd.markForCheck();
      this.load_page();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.load_page();
  }

  load_page() {
    this.loading = true;
    this.posts = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.limit = this.limit;
      // this.query.offset =  (this.limit * (this.currentPage - 1));
      this.query.page = this.currentPage
    }

    this.runQuery().subscribe(results => {
      console.log('res',results)
      this.loading = false;
      if(results.success){
        console.log("update data")
        this.posts = results.data
        this.totalPages = Array.from(new Array(Math.ceil(results.count / this.limit)), (val, index) => index + 1);
        console.log("posts", this.posts)
      }
      else{
        alert("Get posts Failed")
      }
    })
  }

  runQuery(): Observable<any>{
    const resp = config2resp(this.query)
    console.log('Getting posts from db',resp)
    return this.http.post<any>(`${environment.ms3Url}/api/forum/user_id/${this.userId}`, resp);
  }

}
