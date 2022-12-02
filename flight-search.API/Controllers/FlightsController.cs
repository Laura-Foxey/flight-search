using Microsoft.AspNetCore.Mvc;

using System.Text.Json;
using Newtonsoft.Json;
using flight_search.API.Repository;

namespace flight_search.API.Controllers;


[ApiController]
public class FlightsController : ControllerBase
{
    private readonly IDBAccess _access;

    public FlightsController(IDBAccess db)
    {
        _access = db;
    }

    [HttpGet]
    [Route("flights")]
    public async Task<IActionResult> GetByParams(string departure, string destination, DateTime date)
    {
        try 
        {
            var flight = await Task.Run(() => _access.GetFlight(departure, destination, date)).WaitAsync(TimeSpan.FromSeconds(3));

            if (flight == null) return NotFound();
            return Ok(flight);
        }
        catch (TimeoutException)
        {
            return new StatusCodeResult(408);
        }

    }

    [HttpGet]
    [Route("flights/itinerary/{id}")]
    public async Task<IActionResult> GetFlight(int id)
    {
        try
        {
            var flight = await Task.Run(() => _access.GetByID(id)).WaitAsync(TimeSpan.FromSeconds(3));
            if (flight == null) return NotFound();
            return Ok(flight);
        }
        catch (TimeoutException) 
        {
            return new StatusCodeResult(408);
        }
    }


    [HttpPatch]
    [Route("flights/{id}")]
    public async Task<IActionResult> UpdateSeats(string departure, string destination, int id, int passangers)
    {
        try
        {
            var res = await Task.Run(() => _access.ReserveSeats(departure, destination, id, passangers)).WaitAsync(TimeSpan.FromSeconds(3));
            if (!res) return StatusCode(405);
            return Ok();
        }
        catch(TimeoutException)
        {
            return new StatusCodeResult(408);
        }
    }
}
