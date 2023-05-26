using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Http;
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
    }
}