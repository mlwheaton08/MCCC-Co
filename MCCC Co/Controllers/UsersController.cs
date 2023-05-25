using MCCC_Co_.Models;
using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MCCC_Co_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;

        public UsersController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet("{firebaseId}")]
        public IActionResult GetByFirebaseId(string firebaseId)
        {
            var user = _userRepo.GetByFirebaseId(firebaseId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("{firebaseId}/expandAddresses")]
        public IActionResult GetByFirebaseIdWithAddresses(string firebaseId)
        {
            var user = _userRepo.GetByFirebaseIdWithAddresses(firebaseId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepo.Add(user);
            //return CreatedAtAction("Get", new { id = user.Id }, user);
            return Ok();
        }
    }
}
