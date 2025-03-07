'use client'

import Features from '@/components/landing/Features'
import Footer from '@/components/landing/Footer'
import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import PaymentButton from '@/components/shared/PaymentButton'
import StatsComponent from '@/components/landing/Stats'
import { v4 as uid } from 'uuid'

export default function Home() {
    // const router = useRouter()
    // const { user, isLoading }: any = useAuth()
    // const { events }: any = useEvent()
    console.log(uid())

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
