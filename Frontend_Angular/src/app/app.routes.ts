import { Routes } from '@angular/router';
import { ArticleListComponent } from './features/articles/article-list/article-list.component';
import { ArticleDetailsComponent } from './features/articles/article-details/article-details.component';
import { AddArticleComponent } from './features/articles/add-article/add-article.component';

export const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
  },
  {
    path: 'articles/list/:id',
    component: ArticleDetailsComponent,
  },
  {
    path: 'articles/add',
    component: AddArticleComponent,
  },
];
