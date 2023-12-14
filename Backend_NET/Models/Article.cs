namespace Backend_NET.Models
{
    public partial class Article
    {
        public int ArticleId { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string ArticleType { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Today;
    }
}