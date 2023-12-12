using Backend_NET.Data;
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
    public IEnumerable<Article> GetUsers()
    {
        IEnumerable<Article> articles = _entityFramework.Articles.ToList<Article>();
        return articles;
    }
}