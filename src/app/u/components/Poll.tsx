import { CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface Poll {
    question: string
    options: { id: number; text: string; votes: number }[]
}

export default function PollPage() {
    const [poll, setPoll] = useState<Poll>({
        question: 'What is your favorite programming language?',
        options: [
            { id: 1, text: 'JavaScript', votes: 0 },
            { id: 2, text: 'Python', votes: 0 },
            { id: 3, text: 'TypeScript', votes: 0 },
            { id: 4, text: 'Go', votes: 0 },
        ],
    })
    const [voted, setVoted] = useState(false)

    const handleVote = (optionId: number) => {
        if (!voted) {
            setPoll((prev) => ({
                ...prev,
                options: prev.options.map((option) =>
                    option.id === optionId
                        ? { ...option, votes: option.votes + 1 }
                        : option
                ),
            }))
            setVoted(true)
        }
    }

    return (
        <div className="flex flex-col h-full bg-neutral-950 w-full text-white">
            {/* Header */}
            <div className="p-4 border-b border-neutral-700">
                <h1 className="text-2xl font-bold text-green-500">Live Poll</h1>
            </div>

            {/* Poll Question */}
            <div className="p-4">
                <h2 className="text-xl font-semibold">{poll.question}</h2>
            </div>

            {/* Poll Options */}
            <div className="flex-1 p-4 space-y-2">
                {poll.options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                            voted
                                ? 'bg-neutral-800'
                                : 'bg-neutral-800 hover:bg-neutral-700'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <p>{option.text}</p>
                            {voted && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-neutral-400">
                                        {option.votes} votes
                                    </span>
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-700">
                <p className="text-sm text-neutral-400">
                    {voted
                        ? 'Thank you for voting!'
                        : 'Select an option to vote.'}
                </p>
            </div>
        </div>
    )
}
