using EventApp.Data;
using EventApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            return await _context.Events
                                  .Where(e => e.Username == username)
                                  .ToListAsync();
        }

        public async Task<Event> CreateEventAsync(Event newEvent)
        {
            newEvent.RsvpedUsers = new List<string>();

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return newEvent;
        }
    }
}