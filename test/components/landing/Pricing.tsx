'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CircleDot, Shield, Target } from 'lucide-react'

import { Button } from '@heroui/react'
import { useState } from 'react'

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>(
        'monthly'
    )

    return (
        <div className="w-full min-h-screen my-32 text-white py-16 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Billing  div */}
                {/* <div className="flex justify-center gap-2 mb-12">
          <div
            className="bg-neutral-800 data-[state=on]:bg-neutral-700"
          >
            Monthly
          </div>
          <div
            className="bg-neutral-800 data-[state=on]:bg-neutral-700"
          >
            Annually
          </div>
        </div> */}

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Personal Plan */}
                    <Card className="bg-neutral-900/50 border-neutral-800">
                        <CardHeader>
                            <CircleDot className="w-10 h-10 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Personal
                            </h3>
                            <p className="text-sm text-neutral-400">
                                For individuals who want to securely connect
                                personal devices, for free.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="text-5xl font-bold">Free</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                                <span>1 device</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full ">Try Now</Button>
                        </CardFooter>
                    </Card>

                    {/* Starter Plan */}
                    <Card className="bg-neutral-900/50 border-2 relative scale-105 border-green-500 shadow-2xl shadow-green-800/40  rounded-3xl   bg-gradient-to-b from-green-700/30 to-90% to-transparent b  ">
                        <div className="absolute -top-3 left-0 right-0 flex justify-center">
                            <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
                                Best Deal
                            </span>
                        </div>
                        <CardHeader>
                            <Target className="w-10 h-10 mb-4" />
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-semibold mb-2">
                                    Starter
                                </h3>
                                <span className="bg-green-700 text-white px-2 py-1 rounded-2xl text-xs">
                                    Save 65%
                                </span>
                            </div>
                            <p className="text-sm text-neutral-400">
                                For teams or organizations looking for an
                                easy-to-use, secure, legacy VPN replacement.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4 z-20">
                            <div>
                                <span className="text-5xl font-bold font-serif">
                                    ₹
                                </span>

                                <span className="text-5xl text-white z-20 font-bold">
                                    2.99
                                </span>
                                <span className="text-neutral-400 ml-2">
                                    / month
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-neutral-400">
                                    <span>Covers 5 devices</span>
                                </div>
                                <div className="text-green-500">
                                    +3 EXTRA months
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button color="primary" className="w-full">
                                Subscribe Now
                            </Button>
                            <p className="text-xs text-neutral-400 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                30-day money-back guarantee
                            </p>
                        </CardFooter>
                    </Card>

                    {/* Premium Plan */}
                    <Card className="bg-neutral-900/50 border-neutral-800">
                        <CardHeader>
                            <Target className="w-10 h-10 mb-4" />
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-semibold mb-2">
                                    Premium
                                </h3>
                                <span className="bg-green-700 text-white px-2 py-1 rounded-2xl text-xs">
                                    Save 75%
                                </span>
                            </div>
                            <p className="text-sm text-neutral-400">
                                For companies who need service and resource
                                level authentication and access control.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="text-5xl font-bold font-serif">
                                    ₹
                                </span>
                                <span className="text-5xl font-bold">6.99</span>
                                <span className="text-neutral-400 ml-2">
                                    / month
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-neutral-400">
                                    <span>Covers 10 devices</span>
                                </div>
                                <div className="text-green-600">
                                    +3 EXTRA months
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button className="w-full ">Subscribe Now</Button>
                            <p className="text-xs text-neutral-400 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                30-day money-back guarantee
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
