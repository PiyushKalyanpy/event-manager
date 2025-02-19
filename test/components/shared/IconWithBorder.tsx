import { User } from 'lucide-react'

const IconWithBorder = ({ icon, className }: any) => {
    return <div className={`border rounded-full p-2 ${className}`}>{icon}</div>
}

export default IconWithBorder
