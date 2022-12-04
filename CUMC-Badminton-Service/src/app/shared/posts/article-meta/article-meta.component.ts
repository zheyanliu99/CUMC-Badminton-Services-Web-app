import { Component, Input } from '@angular/core';

import { forumInput } from '../../../forum/forumInput';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html'
})
export class ArticleMetaComponent {
  @Input() post: forumInput;
}
