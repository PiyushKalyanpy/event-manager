'use client'

import FeaturedEvents from '@/components/landing/FeaturedEvents'
import Features from '@/components/landing/Features'
import Footer from '@/components/landing/Footer'
import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import Loading from '@/components/shared/Loading'
import Pricing from '@/components/landing/Pricing'
import Stats from '@/components/landing/Stats'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useEvent } from '@/hooks/useEvent'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
    const { user, isLoading }: any = useAuth()
    const { events }: any = useEvent()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login')
        }
    }, [user, isLoading, router])

    if (isLoading) {
        return <Loading />
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen overflow-x-hidden w-screen bg-black text-gray-100">
            <Header />
            <HeroSection />
            {/* {events && <FeaturedEvents event={events[0]} />} */}
            <Stats />
            <Features />
            <Pricing />
            <Footer />
        </div>
    )
}