using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MCCC_Co_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SeriesController : ControllerBase
    {
        private readonly ISeriesRepository _seriesRepo;

        public SeriesController(ISeriesRepository seriesRepo)
        {
            _seriesRepo = seriesRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_seriesRepo.GetAll());
        }
    }
}