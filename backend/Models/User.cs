using System.Collections.Generic;

namespace EventApp.Models
{
    public class User
    {
        public string Username { get; set; } = string.Empty;

        public List<Event> CreatedEvents { get; set; } = new();

        public List<Event> RsvpedEvents { get; set; } = new();
    }
}
