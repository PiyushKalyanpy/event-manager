'use client'

import { Home, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

const EventScreen: React.FC = () => {
  return (
    <div className="p-4">
      {/* Greeting */}
      <h1 className="text-2xl font-bold">Hi, Piyush Kalyan</h1>
      
      {/* Live Event Section */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Live event</h2>
        <Card className="mt-2 rounded-xl overflow-hidden shadow-md">
          <div className="relative">
            <img
              src="/path-to-your-image.jpg"
              alt="Live Event"
              className="w-full h-40 object-cover"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              ⚫ LIVE
            </div>
            <p className="absolute bottom-2 left-2 text-white font-semibold">
              Yahowa mera badshah
            </p>
          </div>
        </Card>
      </div>
      
      {/* Buy New Event Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Buy a new event</h2>
        <Card className="mt-2 h-40 flex items-center justify-center bg-gray-200 text-gray-500">
          Event Card
        </Card>
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-around">
        <Button variant="ghost">
          <Home className="w-6 h-6" />
          Home
        </Button>
        <Button variant="ghost">
          <User className="w-6 h-6" />
          Profile
        </Button>
      </div>
    </div>
  );
};

export default EventScreen;


// import { Home, Signal, TicketsIcon, UserRound, Wifi } from 'lucide-react'
// import React, { useState } from 'react'

// import LiveChat from './components/LiveChat'
// import NavBar from './components/Navbar'
// import PollPage from './components/Poll'
// import ProfilePage from './components/Profile'

// const User = () => {
//     const [selectedItem, setSelectedItem] = useState(0)

//     return (
//         <div className="flex h-screen w-screen flex-col items-center bg-neutral-950">
//   <div className="w-full md:w-1/2 flex-1">
//     <div className="w-full h-full">
//       {selectedItem === 3 && <ProfilePage />}
//       {selectedItem === 1 && <LiveChat />}
//       {selectedItem === 2 && <PollPage />}
//     </div>
//   </div>
//   <div className="w-full md:w-1/2">
//     <NavBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
//   </div>
// </div>

//     )
// }

// export default User
