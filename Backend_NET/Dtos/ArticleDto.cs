namespace Backend_NET.Dtos
{
    public partial class ArticleDto
    {
        public int ArticleId { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string ArticleType { get; set; } = "";
        public DateTime CreatedAt { get; set; }
    }
}