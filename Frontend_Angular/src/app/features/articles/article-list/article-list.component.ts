import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
  providers: [ArticleService],
})
export class ArticleListComponent implements OnInit, OnDestroy {
  articlesFromAPI?: Article[];
  searchString: string = '';
  articlesToDisplay?: Article[];

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

  onSearchChange(): void {
    if (!this.articlesFromAPI) {
      return;
    }

    this.articlesToDisplay = this.articlesFromAPI.filter(
      (article) =>
        article.title.toLowerCase().includes(this.searchString.toLowerCase()) ||
        article.description
          .toLowerCase()
          .includes(this.searchString.toLowerCase())
    );
  }
}
