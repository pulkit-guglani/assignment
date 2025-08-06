using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventApp.Data;
using EventApp.Models;
using Microsoft.EntityFrameworkCore;

namespace EventApp.Services
{
    public class EventService : IEventService
    {
        private readonly AppDbContext _context;

        public EventService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetEventsByUserAsync(string username)
        {
            return await _context.Events.Where(e => e.Username == username).ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetRsvpedEventsByUserAsync(string username)
        {
            // Retrieve all events and filter in-memory for RSVPs containing the specified username
            var allEvents = await _context.Events.ToListAsync();
            return allEvents.Where(e => e.RsvpedUsers.Contains(username));
        }

        public async Task<Event> CreateEventAsync(Event newEvent)
        {
            if (newEvent == null)
                throw new ArgumentNullException(nameof(newEvent));

            // Ensure user exists or create a new one
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Username == newEvent.Username
            );
            if (user == null)
            {
                user = new User { Username = newEvent.Username };
                _context.Users.Add(user);
            }

            newEvent.RsvpedUsers = new List<string>();

            _context.Events.Add(newEvent);

            // Save changes for both user and event in one transaction
            await _context.SaveChangesAsync();

            return newEvent;
        }
    }
}
