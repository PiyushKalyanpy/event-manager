import Image from 'next/image'

const Features = () => {
    const img =
        'https://static.wixstatic.com/media/a1a7ae_9a19b400a37e4efab3c86dfdf8fc8504~mv2.jpg/v1/fill/w_752,h_502,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/a1a7ae_9a19b400a37e4efab3c86dfdf8fc8504~mv2.jpg'

    return (
        <div className="w-screen h-screen flex mt-32 flex-col gap-24   overflow-hidden  items-center justify-center">
            <Image
                src="/features.svg"
                alt="features"
                width={100}
                height={100}
                className="w-72 object-cover"
            />
            <div className="w-3/4 flex  gap-8 grid-cols-2  ">
                <div className="flex gap-8 w-3/4   flex-col">
                    <Item
                        title="Event Management"
                        description="Effortlessly manage all aspects of your event, from registration to post-event analysis."
                    />
                    <Item
                        title="Real-Time Analytics"
                        description="Track event performance with live dashboards and actionable insights for informed decision-making."
                    />
                    <Item
                        title="Integrated Ticketing System"
                        description="Simplify attendee registration and payments with a secure and user-friendly ticketing solution."
                    />
                    <Item
                        title="Attendee Engagement Tools"
                        description="Boost participation with interactive polls, Q&A sessions, and personalized event updates."
                    />
                </div>
                <div className="flex relative gap-4  flex-col w-1/2 ">
                    <Image
                        src={img}
                        alt="features"
                        width={1000}
                        height={1000}
                        className="w-full object-cover z-10 h-full rounded-2xl"
                    />
                    <Image
                        src={img}
                        alt="features"
                        width={10}
                        height={10}
                        className="w-full blur-2xl saturate-100 absolute top-0 left-0 opacity-90 object-cover h-full"
                    />
                </div>
            </div>
        </div>
    )
}

const Item = ({ title, description }: any) => {
    return (
        <div className="flex w-full">
            <div className="w-3/4 flex flex-col gap-2 text-start border-b pb-6 border-neutral-800    ">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <p className=" text-neutral-400">{description}</p>
            </div>
        </div>
    )
}

export default Features
