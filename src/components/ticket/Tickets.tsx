import React from 'react';

interface BoardingPassProps {
  airline: string;
  aircraft: string;
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  flightDuration: string;
  className: string;
  terminal: string;
  gate: string;
  seat: string;
}

const BoardingPass: React.FC<BoardingPassProps> = ({
  airline,
  aircraft,
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  flightDuration,
  className,
  terminal,
  gate,
  seat,
}) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <div className="flex justify-between">
        <div>
          {/* <img src={airlineLogo} alt={airline} className="w-12 h-12" /> */}
        </div>
        <div className="text-right">
          <p className="text-sm">{aircraft}</p>
          <p className="text-sm">{flightDuration}</p>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="text-left">
          <p className="text-lg">{departureTime}</p>
          <p className="text-sm">{departureAirport}</p>
        </div>
        <div className="text-right">
          <p className="text-lg">{arrivalTime}</p>
          <p className="text-sm">{arrivalAirport}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-bold">Class</p>
            <p className="text-sm">{className}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Terminal</p>
            <p className="text-sm">{terminal}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Gate</p>
            <p className="text-sm">{gate}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Seat</p>
            <p className="text-sm">{seat}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Boarding Pass
        </button>
      </div>
    </div>
  );
};

export default BoardingPass;