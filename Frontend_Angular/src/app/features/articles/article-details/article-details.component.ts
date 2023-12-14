import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  providers: [ArticleService],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  articleId: number | null | undefined;
  articleDetails: Article | undefined;

  private articleDetailsSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.articleId = id ? +id : null;

    if (this.articleId) {
      this.articleDetailsSubscription = this.articleService
        .getArticleDetails(this.articleId)
        .subscribe({
          next: (response) => {
            this.articleDetails = response;
          },
          error: (err) => {
            console.error('Error fetching article details:', err);
          },
        });
    } else {
      console.error('Unexpected navigation error');
    }
  }

  ngOnDestroy(): void {
    this.articleDetailsSubscription?.unsubscribe();
  }
}
