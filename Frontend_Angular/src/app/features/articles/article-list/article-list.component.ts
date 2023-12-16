import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ARTICLE_TYPES } from '../../../shared/shared-constants';
import { NewlinePipe } from '../../../shared/pipes/newline.pipe';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NewlinePipe],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
  providers: [ArticleService],
})
export class ArticleListComponent implements OnInit, OnDestroy {
  articleTypes = ARTICLE_TYPES;
  articlesFromAPI?: Article[];
  searchString: string = '';
  articlesToDisplay?: Article[];
  filterByType: string = '';
  filterByDate: string = '';

  private articleListSubscription?: Subscription;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe({
      next: (response) => {
        this.articlesFromAPI = response;
        this.articlesToDisplay = this.articlesFromAPI;
      },
      error: (err) => {
        console.error('Error fetching list of articles:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.articleListSubscription?.unsubscribe();
  }

  onCardClick(article: Article): void {
    this.router.navigate(['/articles/list', article.articleId]);
  }

  clearArticleTypeSelection(): void {
    this.filterByType = '';
    this.onFilterOrSearchChange();
  }

  onFilterOrSearchChange(): void {
    if (!this.articlesFromAPI) {
      return;
    }

    this.articlesToDisplay = this.articlesFromAPI.filter((article) => {
      const matchesType = this.filterByType
        ? article.articleType === this.filterByType
        : true;

      const matchesDate = this.filterByDate
        ? article.createdAt.toString().split('T')[0] === this.filterByDate
        : true;

      const matchesSearch =
        article.title.toLowerCase().includes(this.searchString.toLowerCase()) ||
        article.description
          .toLowerCase()
          .includes(this.searchString.toLowerCase());

      return matchesType && matchesDate && matchesSearch;
    });
  }
}
