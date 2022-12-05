import { Component, Input } from '@angular/core';

import { postInput } from '../../../post-details/postInput';
import { ArticleListConfig } from './article-list-config.model';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.css'],
  templateUrl: './article-list.component.html'
})

export class ArticleListComponent {
  posts: Array<postInput> = [];
  userId: string;
  labels: Array<string>;
  query: ArticleListConfig;
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  constructor ( private http:HttpClient,
                public dialog: MatDialog) {
    this.userId = sessionStorage.getItem('userId')
  }

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.load_page();
    }
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
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.runQuery(this.query.label).subscribe(results => {
      console.log('res',results)
      this.loading = false;
      if (results.post){
        results = results.post
      }
      if(results.success){
        console.log("update data")
        this.posts = results.data
        this.labels = results.labels
        console.log("posts", this.posts)
      }
      else{
        alert("Selection Failed")
      }
    })
  }

  runQuery(cat: string): Observable<any>{
    if (cat == "All Posts") {
      console.log('all posts interact with db')
      return this.http.get<any>(`${environment.ms3Url}/api/forum/user_id/${this.userId}`);
    } else if (cat == "My Posts") {
      console.log('my posts interact with db')
      return this.http.get<any>(`${environment.ms3Url}/api/forum/myposts/user_id/${this.userId}`);
    } else {
      console.log('cat interact with db')
      const label_dict = {'Administrative': '1', 'Lost and Found': '2', 'Call for Partners': '3', 'Others': '4'}
      return this.http.get<any>(`${environment.ms3Url}/api/forum/cat/${label_dict[cat]}/user_id/${this.userId}`)
    }
  }

}
