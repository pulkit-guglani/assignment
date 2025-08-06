using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventApp.Models
{
    public class User
    {
        [Key]
        [Required]
        public string Username { get; set; } = string.Empty;

        [NotMapped]
        public List<Event> CreatedEvents { get; set; } = new();

        [NotMapped]
        public List<Event> RsvpedEvents { get; set; } = new();
    }
}
