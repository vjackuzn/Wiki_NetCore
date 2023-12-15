import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddArticleRequest } from '../models/add-article-request.model';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.css',
  providers: [ArticleService],
})
export class AddArticleComponent implements OnDestroy {
  model: AddArticleRequest;

  private addArticleSubscription: Subscription | undefined;

  constructor(private articleService: ArticleService, private router: Router) {
    this.model = {
      title: '',
      description: '',
      articleType: '',
      createdAt: null,
    };
  }

  ngOnDestroy(): void {
    this.addArticleSubscription?.unsubscribe();
  }

  onFormSubmit() {
    if (this.isAnyFieldEmpty()) {
      alert('Please fill in all the fields.');
      return;
    }

    this.addArticleSubscription = this.articleService
      .addArticle(this.model)
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err) => {
          alert(`Failed to submit an article: ${err}`);
        },
      });
  }

  isAnyFieldEmpty(): boolean {
    return (
      !this.model.title ||
      !this.model.description ||
      !this.model.articleType ||
      !this.model.createdAt
    );
  }
}
