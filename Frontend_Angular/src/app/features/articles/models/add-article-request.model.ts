export interface AddArticleRequest {
  title: string;
  description: string;
  articleType: string;
  createdAt: Date | null;
}
