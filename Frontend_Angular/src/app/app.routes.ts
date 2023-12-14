import { Routes } from '@angular/router';
import { ArticleListComponent } from './features/articles/article-list/article-list.component';
import { ArticleDetailsComponent } from './features/articles/article-details/article-details.component';

export const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
  },
  {
    path: 'articles/:id',
    component: ArticleDetailsComponent,
  },
];
