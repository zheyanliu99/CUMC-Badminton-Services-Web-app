import { Component, Input } from '@angular/core';

import { postInput } from '../../../post-details/postInput';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html'
})
export class ArticleMetaComponent {
  @Input() post: postInput;
}
