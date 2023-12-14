import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  providers: [ArticleService],
})
export class ArticleDetailsComponent {
  articleId: number | null | undefined;
  articleDetails: Article | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.articleId = id ? +id : null;

    if (this.articleId) {
      this.articleService.getArticleDetails(this.articleId).subscribe({
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
}
