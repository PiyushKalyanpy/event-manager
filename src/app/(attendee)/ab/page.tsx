'use client'

import {
    AlertCircle,
    BarChart2,
    Clock,
    FlameIcon as Fire,
    Heart,
    HelpCircle,
    Music,
    Send,
    Star,
    ThumbsUp,
    Users,
    Zap,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

export default function ConcertLive() {
    const [message, setMessage] = useState('')
    const [activeTab, setActiveTab] = useState('feed')
    const [showSosConfirm, setShowSosConfirm] = useState(false)
    const [reactionCount, setReactionCount] = useState({
        heart: 342,
        fire: 189,
        star: 156,
        zap: 98,
        thumbsUp: 245,
    })
    const feedContainerRef = useRef<HTMLDivElement>(null)
    const reactionContainerRef = useRef<HTMLDivElement>(null)
    const eventInfoRef = useRef<HTMLDivElement>(null)

    // Scroll feed to bottom when new messages would appear
    useEffect(() => {
        if (feedContainerRef.current) {
            feedContainerRef.current.scrollTop =
                feedContainerRef.current.scrollHeight
        }
        if (eventInfoRef.current) {
            eventInfoRef.current.scrollTop = 0
        }
    }, [])

    const sendMessage = () => {
        if (message.trim()) {
            // In a real app, you would send this to your backend
            console.log('Message sent:', message)
            setMessage('')
        }
    }

    const handleSosClick = () => {
        setShowSosConfirm(true)
    }

    const confirmSos = () => {
        // In a real app, this would trigger an emergency alert
        console.log('SOS alert triggered')
        setShowSosConfirm(false)
    }

    const cancelSos = () => {
        setShowSosConfirm(false)
    }

    const triggerReaction = (type: keyof typeof reactionCount) => {
        // Update count
        setReactionCount((prev) => ({
            ...prev,
            [type]: prev[type] + 1,
        }))

        // Create and animate emoji
        if (reactionContainerRef.current) {
            const emojis = {
                heart: '❤️',
                fire: '🔥',
                star: '⭐',
                zap: '⚡',
                thumbsUp: '👍',
            }

            const emoji = emojis[type]

            // Create multiple instances of the same emoji for a burst effect
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const animationElement = document.createElement('div')
                    animationElement.className =
                        'absolute text-2xl animate-float-reaction'
                    animationElement.innerHTML = emoji

                    // Randomize starting position slightly
                    const leftPosition = 40 + Math.random() * 20 // 40-60% from left
                    animationElement.style.left = `${leftPosition}%`
                    animationElement.style.bottom = '70px'

                    // Add some random rotation and scale
                    const rotation = -15 + Math.random() * 30 // -15 to 15 degrees
                    const scale = 0.8 + Math.random() * 0.4 // 0.8 to 1.2
                    animationElement.style.transform = `rotate(<span class="math-inline">\{rotation\}deg\) scale\(</span>{scale})`

                    reactionContainerRef.current?.appendChild(animationElement)

                    // Remove after animation completes
                    setTimeout(() => {
                        animationElement.remove()
                    }, 2000)
                }, i * 150) // Stagger the animations
            }
        }
    }

    return (
        <div className="flex flex-col h-screen bg-zinc-950 text-white">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                    <h1 className="text-lg font-semibold">
                        LIVE: Cosmic Harmony Tour 2025
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span className="text-sm">3,842 attending</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span className="text-sm">1:24:36</span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                    >
                        Share
                    </Button>
                </div>
            </header>

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Main feed and engagement area */}
                <div className="flex-1 flex flex-col">
                    <div className="relative flex-1 flex flex-col">
                        {/* Dynamic Feedback Board */}
                        <div
                            ref={feedContainerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-zinc-900 to-zinc-950"
                        >
                            <div className="text-center py-2 px-4 bg-zinc-800/50 rounded-full mx-auto w-fit text-sm text-zinc-400">
                                Concert started 1 hour 24 minutes ago
                            </div>

                            {/* Announcements */}
                            <Card className="bg-blue-900/20 border-blue-800/50">
                                <CardContent className="p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-blue-600/30 p-2 rounded-full">
                                            <Music
                                                size={20}
                                                className="text-blue-300"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-blue-300">
                                                Announcement
                                            </h3>
                                            <p className="text-sm text-blue-100">
                                                The band will be taking song
                                                requests for the encore! Submit
                                                your requests in the Q&A
                                                section.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* User reactions and comments */}
                            <div className="flex items-start space-x-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                    <AvatarFallback className="bg-purple-600">
                                        AS
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-purple-400">
                                            Alice Smith
                                        </span>
                                        <span className="text-xs text-zinc-500">
                                            2:34 PM
                                        </span>
                                    </div>
                                    <p className="text-sm">
                                        This opening song is incredible! The
                                        light show is amazing too! 🔥
                                    </p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <div className="bg-zinc-800/80 rounded-full px-2 py-0.5 text-xs flex items-center">
                                            <Heart
                                                size={12}
                                                className="text-red-400 mr-1"
                                            />
                                            <span>24</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
