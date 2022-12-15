import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { forumInput } from './forumInput';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddPostDialogComponent} from "../add-post-dialog/add-post-dialog.component";
import { ArticleListConfig } from '../shared/posts/article-list/article-list-config.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, OnChanges {
  posts: Array<forumInput>;
  userId: string;
  labels: Array<string> = [];
  // sort_tags: Array<string> = ["popular","relevant"]

  label: string;
  sort: string;
  listConfig: ArticleListConfig = {
    label: 'All Posts',
    mypost: false,
    limit: 3,
    page: 1,
    sort: "recent"
  };

  @Input() mypost: boolean;

  constructor(private http:HttpClient,
              public dialog: MatDialog
              // private changeDetectorRef: ChangeDetectorRef
              // private router: Router,private route: ActivatedRoute
              ) {
    // this.userId = sessionStorage.getItem('userId')
    this.userId = "8"
  }

  ngOnInit(): void {
    console.log("init")
    if (this.mypost) {
      this.listConfig.mypost = this.mypost
    }
    this.label = "All Posts"
    this.sort = "recent"
    // this.route.queryParams.subscribe(params => {
    //   if (params['label']) {
    //     this.setListTo(params['label'])
    //     console.log("label",this.label, this.listConfig)
    //   } else {
    //     this.setListTo('All Posts')
    //   }
    // });
    this.getLabels().subscribe(results => {
      if(results.success){
        console.log("update labels")
        this.labels = results.labels
        console.log(this.labels)
      }
      else{
        alert("Labels Not Found")
      }
    })
    // this.setLabelTo(this.label);
    // this.load_page()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  setLabelTo(label: string = '') {
    // set the list object
    const newconfig = Object.create(this.listConfig);
    this.label = label
    newconfig.label = label
    this.listConfig = newconfig
    console.log("change",this.listConfig)
    // this.listConfig.label = label
    // this.changeDetectorRef.detectChanges()
  }

  update($event: any){
    // this.setLabelTo(this.label)
    alert("update successful")
  }

  setSortTo(method: string = 'recent') {
    const newconfig = Object.create(this.listConfig);
    this.sort = method
    newconfig.sort = method
    this.listConfig = newconfig
    console.log("change",this.listConfig)
  }

  // add a simpler api path
  getLabels(): Observable<any>{
    console.log('renew')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/labels`);
  }



//   load_page(): void{
//     if (this.label == "All Posts") {
//       this.get_allposts().subscribe(results => {
//         if(results.success){
//           console.log("update data")
//           this.posts = results.data
//           this.labels = results.labels
//           console.log(this.posts)
//         }
//         else{
//           alert("Results Not Found")
//         }
//       })
//     }
//     else{
//       this.select_cat(this.label)
//     }
// }
//
//   get_allposts():Observable<any>{
//     console.log('renew')
//     return this.http.get<any>(`${environment.ms3Url}/api/forum/user_id/${this.userId}`);
//   }
//
//   thumb_up(post_id:number): void {
//     console.log('thumb_up status changed')
//     this.change_thumb_post(post_id).subscribe(results => {
//       if (!results.success) {
//       //   alert(results.message)
//       // } else {
//         alert("thumb up failed")
//         console.log(results)
//       }
//       this.load_page()
//     })
//   }
//
//   change_thumb_post(post_id: number): Observable<any>{
//     console.log('thumb update')
//     return this.http.get<any>(`${environment.ms3Url}/api/forum/post/${post_id}/thumb/user_id/${this.userId}`);
//   }
//
//   select_cat(cat: string): void{
//     console.log('category require send')
//     this.get_post_cat(cat).subscribe(results => {
//       if (results.post.success) {
//         this.posts = results.post.data
//         this.label = cat
//         console.log(this.posts)
//       } else {
//         alert("Category selecting failed")
//         console.log(results)
//       }
//     })
//   }
//
//   get_post_cat(cat: string): Observable<any>{
//     console.log('cat interact with db')
//     const label_dict = {'Administrative': '1', 'Lost and Found': '2', 'Call for Partners': '3', 'Others': '4'}
//     return this.http.get<any>(`${environment.ms3Url}/api/forum/cat/${label_dict[cat]}/user_id/${this.userId}`);
//   }

  openDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    dialogConfig.height = "550px";
    dialogConfig.data = {
      method: 'add'
    }

    let dialogRef = this.dialog.open(AddPostDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
      this.setLabelTo(this.label);
    })
  }



}
