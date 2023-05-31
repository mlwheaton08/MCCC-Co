using MCCC_Co_.Models;
using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MCCC_Co_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;

        public OrdersController(IOrderRepository orderRepo)
        {
            _orderRepo = orderRepo;
        }

        [HttpGet]
        public IActionResult Get(string userFirebaseId, bool isComplete)
        {
            return Ok(_orderRepo.GetAllByUserFirebaseId(userFirebaseId, isComplete));
        }

        [HttpPost]
        public IActionResult Post(Order order)
        {
            _orderRepo.Add(order);
            return CreatedAtAction("Get", new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _orderRepo.Update(order);
            return NoContent();
        }
    }
}