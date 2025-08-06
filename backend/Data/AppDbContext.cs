using EventApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Collections.Generic;
using System.Linq;

namespace EventApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Event> Events => Set<Event>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var stringListConverter = new ValueConverter<List<string>, string>(
                v => v == null ? string.Empty : string.Join(',', v),
                v => string.IsNullOrEmpty(v)
                    ? new List<string>()
                    : v.Split(',', System.StringSplitOptions.RemoveEmptyEntries).ToList());

            modelBuilder.Entity<Event>()
                        .Property(e => e.RsvpedUsers)
                        .HasConversion(stringListConverter);
        }
    }
}