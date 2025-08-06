using System.Collections.Generic;
using System.Threading.Tasks;
using EventApp.Models;

namespace EventApp.Services
{
    public interface IUserService
    {
        Task<User> LoginOrSignUp(string username);
    }
}
