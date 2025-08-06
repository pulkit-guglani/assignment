using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventApp.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string EventName { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan Time { get; set; }

        public string Location { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int MaxRsvpCount { get; set; }

        // Stored as comma-separated string in SQLite via EF Core value converter
        public List<string> RsvpedUsers { get; set; } = new();
    }
}