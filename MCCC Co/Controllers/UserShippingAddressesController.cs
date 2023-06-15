using MCCC_Co_.Models;
using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MCCC_Co_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserShippingAddressesController : ControllerBase
    {
        private readonly IUserShippingAddressRepository _userAddressShippingRepo;

        public UserShippingAddressesController(IUserShippingAddressRepository userAddressShippingRepo)
        {
            _userAddressShippingRepo = userAddressShippingRepo;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userShippingAddress = _userAddressShippingRepo.GetById(id);
            if (userShippingAddress == null)
            {
                return NotFound();
            }
            return Ok(userShippingAddress);
        }

        [HttpPost]
        public IActionResult Post(UserShippingAddress userShippingAddress)
        {
            _userAddressShippingRepo.Add(userShippingAddress);
            return CreatedAtAction("Get", new { id = userShippingAddress.Id }, userShippingAddress);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserShippingAddress userShippingAddress)
        {
            if (id != userShippingAddress.Id)
            {
                return BadRequest();
            }

            _userAddressShippingRepo.Update(userShippingAddress);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userAddressShippingRepo.Delete(id);
            return NoContent();
        }
    }
}