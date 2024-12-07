import { CircularProgress } from '@nextui-org/react'

const Loading = () => {
    return (
        <div className="page-wrapper ">
            <CircularProgress size="lg" className="scale-150" />
        </div>
    )
}

export default Loading
