const IconWithValue = (values: any) => {
    return (
        <div className="flex items-center gap-2 ">
            <values.icon size={16} />
            <p className="text-neutral-400">{values.label}</p>
        </div>
    )
}

export default IconWithValue
