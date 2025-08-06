using System.Linq;
using System.Threading.Tasks;
using EventApp.Models;
using EventApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IEventService _eventService;

        public UsersController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            var createdEvents = await _eventService.GetEventsByUserAsync(username);
            var rsvpedEvents = await _eventService.GetRsvpedEventsByUserAsync(username);

            var userProfile = new User
            {
                Username = username,
                CreatedEvents = createdEvents.ToList(),
                RsvpedEvents = rsvpedEvents.ToList(),
            };

            return Ok(userProfile);
        }
    }
}
