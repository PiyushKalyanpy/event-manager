'use client'

import Features from '@/components/landing/Features'
import Footer from '@/components/landing/Footer'
import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import PricingSection from '@/components/landing/Pricing'
import StatsComponent from '@/components/landing/Stats'

export default function Home() {
    // const router = useRouter()
    // const { user, isLoading }: any = useAuth()
    // const { events }: any = useEvent()

    // useEffect(() => {
    //     if (!isLoading && !user) {
    //         router.push('/login')
    //     }
    // }, [user, isLoading, router])

    // if (isLoading) {
    //     return <Loading />
    // }

    // if (!user) {
    //     return null
    // }

    return (
        <div className="min-h-screen overflow-x-hidden w-screen bg-black text-gray-100">
            <Header />
            <HeroSection />
            <StatsComponent />
            <Features />
            <Footer />
        </div>
    )
}
