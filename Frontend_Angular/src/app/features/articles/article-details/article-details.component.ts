import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NewlinePipe } from '../../../shared/pipes/newline.pipe';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule, RouterModule, NewlinePipe],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  providers: [ArticleService],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  articleId: number | null | undefined;
  articleDetails: Article | undefined;
  isGetRecordFailed: boolean = false;

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
          error: () => {
            this.isGetRecordFailed = true;
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.articleDetailsSubscription?.unsubscribe();
  }
}
