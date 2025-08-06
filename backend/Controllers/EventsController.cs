using System.Collections.Generic;
using System.Threading.Tasks;
using EventApp.Models;
using EventApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventsController(IEventService eventService)
        {
            _eventService = eventService;
        }

        // GET: api/events/{username}
        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsByUser(string username)
        {
            var events = await _eventService.GetEventsByUserAsync(username);
            return Ok(events);
        }

        // POST: api/events
        [HttpPost]
        public async Task<ActionResult<Event>> CreateEvent(Event eventRequest)
        {
            var createdEvent = await _eventService.CreateEventAsync(eventRequest);

            return CreatedAtAction(
                nameof(GetEventsByUser),
                new { username = createdEvent.Username },
                createdEvent
            );
        }
    }
}
