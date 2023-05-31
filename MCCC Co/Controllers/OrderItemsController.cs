using MCCC_Co_.Models;
using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MCCC_Co_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
    {
        private readonly IOrderItemRepository _orderItemRepo;

        public OrderItemsController(IOrderItemRepository orderItemRepo)
        {
            _orderItemRepo = orderItemRepo;
        }

        [HttpPost]
        public IActionResult Post(OrderItem orderItem)
        {
            _orderItemRepo.Add(orderItem);
            return CreatedAtAction("Get", new { id = orderItem.Id }, orderItem);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, OrderItem orderItem)
        {
            if (id != orderItem.Id)
            {
                return BadRequest();
            }

            _orderItemRepo.Update(orderItem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _orderItemRepo.Delete(id);
            return NoContent();
        }
    }
}