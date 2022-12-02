import "../CSS/Results.css"
import ResultsCard from './ResultsCard'

interface Props {
  inbound: {
    flight_id: string,
    departureDestination: string,
    arrivalDestination: string,
    itineraries: {
      itinerary_id: number,
      departureAt: Date,
      arriveAt: Date,
      avaliableSeats: number,
      expanded: boolean,
      prices: {
        currency: string,
        adult: number,
        child: number
      }[]
    }[]
  }
  title: string,
  saved: string[],
  setSaved: any,
  seats: number,
  limit: number
}

function Results({inbound, title, saved, setSaved, seats, limit}: Props) {

  if (!inbound.itineraries) { return (<></>)}

  if (saved.length >= limit) {return (
    <div className="review" > 
      <p>Flight {inbound.departureDestination} → {inbound.arrivalDestination} selected</p> 
    </div>)}

  return (
      <>
       <p>{title}{inbound.itineraries.length}</p>
        <ul className='search__results'>
          {inbound.itineraries.map((flight: any) => (
              <ResultsCard key={flight.itinerary_id} inbound={inbound} flight={flight} setSaved={setSaved} seats={seats}/>
          ))}
        </ul>
      </>
  );
}

export default Results;
