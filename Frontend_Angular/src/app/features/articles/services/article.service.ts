import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { environment } from '@environments/environment';
import { AddArticleRequest } from '../models/add-article-request.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(
      `${environment.apiBaseUrl}/Article/GetArticles`
    );
  }

  getArticleDetails(articleId: number): Observable<Article> {
    return this.http.get<Article>(
      `${environment.apiBaseUrl}/Article/GetSingleArticle/${articleId}`
    );
  }

  addArticle(model: AddArticleRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/Article/AddArticle`,
      model
    );
  }
}
