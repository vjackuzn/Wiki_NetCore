using AutoMapper;
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
    IMapper _mapper;

    public ArticleController(IConfiguration config)
    {
        _entityFramework = new DataContext(config);
        _mapper = new Mapper(new MapperConfiguration(cfg => {
            cfg.CreateMap<ArticleToAddDto, Article>();
        }));
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

    [HttpPost("AddArticle")]
    public IActionResult AddArticle(ArticleToAddDto article)
    {
        Article articleDb = _mapper.Map<Article>(article);

        _entityFramework.Add(articleDb);

        if (_entityFramework.SaveChanges() == 0)
        {
            throw new Exception("Failed to Add Article");
           
        }
        
        return Ok();
    }

    private ArticleDto getArticleDto(Article article)
    {
        return new ArticleDto
        {
            ArticleId = article.ArticleId,
            Title = article.Title,
            Description = article.Description,
            ArticleType = article.ArticleType,
            CreatedAt = article.CreatedAt
        };
    } 
}