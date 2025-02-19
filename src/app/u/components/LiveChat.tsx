import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Plus, Send } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { push, ref } from 'firebase/database'
import { useEffect, useRef, useState } from 'react'

import PollCreator from './PollCreator'
import { rdb } from '@/firebase'
import { useAuth } from '@/hooks/useAuth'

const messagesRef = ref(rdb, 'messages')

interface Message {
    user: string
    email: string
    photoURL: string // Add photoURL
    role: string // Add role
    text: string
    timestamp: string
    eventId: string // Add eventId
}

export default function LiveChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { user } = useAuth()

    // useEffect(() => {
    //     const query = orderByChild('timestamp');
    //     const limitedQuery = limitToLast(20);
    //     const unsubscribe = onValue(ref(rdb, 'messages'), (snapshot) => {
    //         const data = snapshot.val();
    //         if (data) {
    //             const messageList = Object.values(data);
    //             setMessages(messageList);
    //         } else {
    //             setMessages([]);
    //         }
    //     });

    //     return () => unsubscribe();
    // }, []);

    const handleSend = () => {
        if (input.trim() && user) {
            const newMessage: Message = {
                user: user.displayName || user.name || 'Guest', // Handle cases where displayName might not exist
                email: user.email,
                photoURL: user.photoURL || '', // Handle cases where photoURL might not exist
                role: user.role || 'user', // Add the user role
                text: input,
                timestamp: new Date().toISOString(),
                eventId: 'your_event_id', // Replace with the actual event ID
            }

            push(messagesRef, newMessage)
                .then(() => setInput(''))
                .catch((error) =>
                    console.error('Error sending message:', error)
                )
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div className="flex flex-col h-full w-full bg-neutral-950 text-white">
            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                                {message.photoURL ? (
                                    <Avatar>
                                        <AvatarImage
                                            src={message.photoURL}
                                            alt={message.user}
                                        />
                                    </Avatar>
                                ) : (
                                    <div className="bg-green-500 w-full h-full flex items-center justify-center">
                                        <span className="text-sm">
                                            {message.user[0]}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-sm">
                                    {message.user}
                                </p>
                                <p className="mt-1 font-medium">
                                    {message.text}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input box (fixed at bottom) */}
            <div className="p-4 border-t border-neutral-700 bg-neutral-900">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>{' '}
                    <PollCreator/>
                    <button className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors">
                        <Sheet>
                            <SheetTrigger>
                                <div>
                                    <Plus className="w-5 h-5" />
                                </div>
                            </SheetTrigger>
                            <SheetContent side={'bottom'} className=" ">
                                <SheetHeader>
                                    <SheetTitle>
                                        Are you absolutely sure?
                                    </SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </button>
                </div>
            </div>
            <div></div>
        </div>
    )
}
