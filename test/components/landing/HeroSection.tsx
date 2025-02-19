import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision'
import { BackgroundGradientAnimation } from '../ui/background-gradient-animation'
import { Button } from '@heroui/react'

const HeroSection = () => {
    return (
        <div className="w-screen overflow-hidden flex items-center h-screen justify-center -mt-10">
            <div className="w-1/2 items-center h-full  justify-center flex gap-8 flex-col text-center">
                <h1 className="flex text-3xl font-bold ">
                    Revolutionize Your Event Management
                </h1>
                <p>
                    Managing live events is complex, but it doesn’t have to be
                    overwhelming. Transition from disjointed processes to a
                    unified, technology-driven platform designed for efficiency.
                </p>
                <div className="flex gap-4">
                    <Button color="primary">Get Started</Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
