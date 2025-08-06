using System.Collections.Generic;
using System.Threading.Tasks;
using EventApp.Models;

namespace EventApp.Services
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> GetEventsByUserAsync(string username);
        Task<IEnumerable<Event>> GetRsvpedEventsByUserAsync(string username);
        Task<Event> CreateEventAsync(Event newEvent);
        Task<Event> UpdateEventAsync(Event updatedEvent, int eventId);
        Task<bool> DeleteEventAsync(int eventId);
        Task<IEnumerable<Event>> GetAllEventsAsync();
    }
}
