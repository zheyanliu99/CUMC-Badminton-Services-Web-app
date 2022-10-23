import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import {postInput} from "../post-details/postInput";
import {responseInput} from "../post-details/responseInput";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnChanges {

  post: Array<postInput>;
  response: Array<responseInput>;
  userId: string;
  post_id: number;

  constructor(private http:HttpClient,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.userId = sessionStorage.getItem('userId')

    const routeParams = this.route.snapshot.paramMap;
    this.post_id = Number(routeParams.get('post_id'));
  }

  ngOnInit(): void {
    this.load_page()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  load_page() {
    this.get_post_details().subscribe(results => {
      if (results.post.success) {
        console.log("update post")
        this.post = results.post.data
        console.log(this.post)

        if (results.response.success) {
          console.log("update response")
          this.response = results.response.data
          console.log(this.response)
        } else {
          console.log("No response")
          this.response = null
        }
      } else {
        alert("Post Not Found")
      }
    })
  }

  get_post_details(): Observable<any>{
    console.log('renew')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/post/${this.post_id}/user_id/${this.userId}`);
  }

  thumb_up_post(): void {
    console.log('thumb_up status changed')
    this.change_thumb_post().subscribe(results => {
      if (results.success) {
        //alert(results.message)
      } else {
        alert("thumb up failed")
      }
      this.load_page()
    })
  }

  change_thumb_post(): Observable<any>{
    console.log('thumb update')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/click_thumb/post/${this.post_id}/user_id/${this.userId}`);
  }

  thumb_up_resp(response_id:number): void {
    console.log('thumb_up status changed')
    this.change_thumb_response(response_id).subscribe(results => {
      if (results.success) {
        //alert(results.message)
      } else {
        alert("thumb up failed")
      }
      this.load_page()
    })
  }

  change_thumb_response(response_id: number): Observable<any>{
    console.log('thumb update')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/click_thumb/resp/${response_id}/user_id/${this.userId}`);
  }

  commentForm = this.formBuilder.group({
    content: ''
  });

  cmtSubmit(): Observable<any> {
    console.log('comment added')
    const input = {"user_id": this.userId, "post_id": this.post_id, "comment": this.commentForm.value.content}
    console.log(input)
    this.commentForm.reset();
    return null
    //return this.http.post<any>(`${environment.ms3Url}/api/forum/newresponse/user_id/${this.userId}`, input)
  }

}
