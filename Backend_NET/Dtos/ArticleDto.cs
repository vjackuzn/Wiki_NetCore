namespace Backend_NET.Dtos
{
    public partial class ArticleDto
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime CreatedAt { get; set; }
    }
}