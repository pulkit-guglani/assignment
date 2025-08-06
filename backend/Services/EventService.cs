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

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await _context.Events.ToListAsync();
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

        public async Task<Event> UpdateEventAsync(Event updatedEvent, int eventId)
        {
            if (updatedEvent == null)
                throw new ArgumentNullException(nameof(updatedEvent));

            var existingEvent = await _context.Events.FirstOrDefaultAsync(e => e.Id == eventId);
            if (existingEvent == null)
            {
                return null;
            }

            var originalUsername = existingEvent.Username;
            existingEvent = updatedEvent;
            existingEvent.Username = originalUsername;

            await _context.SaveChangesAsync();
            return existingEvent;
        }

        public async Task<bool> DeleteEventAsync(int eventId)
        {
            var existingEvent = await _context.Events.FirstOrDefaultAsync(e => e.Id == eventId);
            if (existingEvent == null)
            {
                return false;
            }

            _context.Events.Remove(existingEvent);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RsvpToEventAsync(int eventId, string username)
        {
            var existingEvent = await _context.Events.FirstOrDefaultAsync(e => e.Id == eventId);
            if (existingEvent == null)
            {
                return false;
            }

            if (existingEvent.RsvpCount >= existingEvent.MaxRsvpCount)
            {
                return false;
            }

            if (existingEvent.RsvpedUsers.Contains(username))
            {
                return false;
            }

            existingEvent.RsvpedUsers.Add(username);
            existingEvent.RsvpCount++;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
