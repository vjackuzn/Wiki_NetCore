using Backend_NET.Data;
using Backend_NET.Dtos;
using Backend_NET.Models;
using Microsoft.AspNetCore.Mvc;


namespace DotnetAPIProject.Controllers;

[ApiController]
[Route("[controller]")]
public class ArticleController : ControllerBase
{
    DataContext _entityFramework;

    public ArticleController(IConfiguration config)
    {
        _entityFramework = new DataContext(config);
    }

    [HttpGet("GetArticles")]
    public IEnumerable<ArticleDto> GetArticles()
    {
        IEnumerable<Article> articles = _entityFramework.Articles.ToList<Article>();
        
        List<ArticleDto> articleDtoList = new List<ArticleDto>();
        foreach(Article article in articles)
        {
            articleDtoList.Add(getArticleDto(article));
        }

        return articleDtoList;
    }

    [HttpGet("GetSingleArticle/{articleId}")]
    public ArticleDto GetSingleArticle(int articleId)
    {
        Article? article = _entityFramework.Articles
            .Where(a => a.ArticleId == articleId)
            .FirstOrDefault<Article>();
         
        if (article == null)
        {
            throw new Exception("Failed to get article");
        }


        return getArticleDto(article);
    }

    private ArticleDto getArticleDto(Article article)
    {
        return new ArticleDto
        {
            ArticleId = article.ArticleId,
            Title = article.Title,
            Description = article.Description,
            CreatedAt = article.CreatedAt
        };
    } 
}