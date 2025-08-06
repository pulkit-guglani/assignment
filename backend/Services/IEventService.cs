using EventApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventApp.Services
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> GetEventsByUserAsync(string username);
        Task<Event> CreateEventAsync(Event newEvent);
    }
}