const Indicator = ({ value }) => {
    return (
        <div>
            {value.value == 'connecting' && (
                <div className="text-yellow-500">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500"></div>
                </div>
            )}
            {value.value == 'unconnected' && (
                <div className="text-red-500">
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500"></div>
                </div>
            )}
            {value.value == 'connected' && (
                <div className="text-green-500">
                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500"></div>
                </div>
            )}
            {value.value == 'notFound' && (
                <div className="text-red-500">
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500"></div>
                </div>
            )}
        </div>
    )
}

export default Indicator
