import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
  providers: [ArticleService],
})
export class ArticleListComponent implements OnInit {
  articles$?: Observable<Article[]>;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.articles$ = this.articleService.getAllArticles();
  }

  onCardClick(article: Article): void {
    this.router.navigate(['/articles/list', article.articleId]);
  }
}
