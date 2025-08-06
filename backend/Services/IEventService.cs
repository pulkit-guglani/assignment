using System.Collections.Generic;
using System.Threading.Tasks;
using EventApp.Models;

namespace EventApp.Services
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> GetEventsByUserAsync(string username);
        Task<Event> CreateEventAsync(Event newEvent);
    }
}
