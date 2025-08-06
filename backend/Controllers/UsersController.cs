using System.Linq;
using System.Threading.Tasks;
using EventApp.Models;
using EventApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventApp.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UsersController(IEventService eventService, IUserService userService)
        : ControllerBase
    {
        private readonly IEventService _eventService = eventService;
        private readonly IUserService _userService = userService;

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

        [HttpPost("login-or-signup/{username}")]
        public async Task<ActionResult<User>> LoginOrSignUp(string username)
        {
            var user = await _userService.LoginOrSignUp(username);
            return Ok(user);
        }
    }
}
