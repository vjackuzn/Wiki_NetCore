using Backend_NET.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend_NET.Data
{
    public class DataContext : DbContext
    {
        private IConfiguration _config;
        public DataContext(IConfiguration config)
        {
            _config = config;
        }

        public virtual DbSet<Article> Articles {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_config.GetConnectionString("DefaultConnection"),
                    options => options.EnableRetryOnFailure());
            }
        }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("WikiAppSchema");
            
            modelBuilder.Entity<Article>()
                .ToTable("Articles", "WikiAppSchema")
                .HasKey(u => u.ArticleId);
        }
    }
}