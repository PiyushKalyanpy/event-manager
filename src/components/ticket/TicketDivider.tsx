const TicketDivider = () => {
    return (
        <div className="w-full flex items-center  divide-dashed divide-y-3 divide-black   ">
            <div className="mask3 bg-black w-6 h-6 -ml-6 rounded-full bg-clip-content" />
            <div className="bg-transparent w-full   " />
            <div className="bg-black w-6 h-6 -mr-6 rounded-full " />
        </div>
    )
}

export default TicketDivider
