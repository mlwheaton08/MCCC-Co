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

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var orderItem = _orderItemRepo.GetById(id);
            if (orderItem == null)
            {
                return NotFound();
            }
            return Ok(orderItem);
        }

        [HttpGet("/openOrderItemTotal/{firebaseId}")]
        public IActionResult GetOpenOrderItemTotalByUserFirebaseId(string firebaseId)
        {
            int? total = _orderItemRepo.GetOpenOrderItemTotalByUserFirebaseId(firebaseId);
            if (total == null)
            {
                return Ok(0);
            }
            return Ok(total);
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