const LiveBlink = () => {
    return (
        <div className="flex  relative w-4 h-4 ">
            <div className="w-4 absolute duration-[3000ms] animate-ping h-4 bg-red-600 rounded-full shadow-xl shadow-red-500/50" />
            <div className="w-4 absolute  h-4 bg-red-600 rounded-full shadow-lg shadow-red-500/80" />
        </div>
    )
}

export default LiveBlink
