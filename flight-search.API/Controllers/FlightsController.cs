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
    public IActionResult GetByParams(string departure, string destination, DateTime date)
    {
        var flight = _access.GetFlight(departure, destination, date);
        if (flight == null) return NotFound();
        return Ok(flight);
    }

    [HttpGet]
    [Route("flights/itinerary/{id}")]
    public IActionResult GetFlight(int id)
    {
        var flight = _access.GetByID(id);
        if (flight == null) return NotFound();
        return Ok(flight);
    }


    [HttpPatch]
    [Route("flights/{id}")]
    public IActionResult UpdateSeats(string departure, string destination, int id, int passangers)
    {
        var res = _access.ReserveSeats(departure, destination, id, passangers);
        if (!res) return StatusCode(405);
        return Ok();
    }
}
