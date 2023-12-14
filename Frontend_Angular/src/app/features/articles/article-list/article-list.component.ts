import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
  providers: [ArticleService],
})
export class ArticleListComponent implements OnInit {
  articles: Article[] | undefined;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe({
      next: (response) => {
        this.articles = response;
      },
      error: (err) => {
        console.error('Error fetching list of articles:', err);
      },
    });
  }

  onCardClick(article: Article): void {
    this.router.navigate(['/articles', article.articleId]);
  }
}
