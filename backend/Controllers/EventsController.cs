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

        [HttpPatch("{eventId}")]
        public async Task<ActionResult<Event>> UpdateEvent(int eventId, Event eventRequest)
        {
            var updatedEvent = await _eventService.UpdateEventAsync(eventRequest, eventId);

            if (updatedEvent == null)
            {
                return NotFound();
            }

            return CreatedAtAction(
                nameof(GetEventsByUser),
                new { username = updatedEvent.Username },
                updatedEvent
            );
        }

        [HttpDelete("{eventId}")]
        public async Task<ActionResult<bool>> DeleteEvent(int eventId)
        {
            var result = await _eventService.DeleteEventAsync(eventId);
            return result ? Ok() : NotFound();
        }
    }
}
