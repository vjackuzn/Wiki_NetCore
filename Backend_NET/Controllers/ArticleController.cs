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
        List<ArticleDto> response = new List<ArticleDto>();

        foreach(Article article in articles)
        {
            response.Add(new ArticleDto
            {
                Title = article.Title,
                Description = article.Description,
                CreatedAt = article.CreatedAt
            });
        }

        return response;
    }
}