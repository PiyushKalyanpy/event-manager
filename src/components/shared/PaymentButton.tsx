import { Button } from '@nextui-org/react'
import Script from 'next/script'
import { toast } from 'react-toast'
import { useState } from 'react'
import { useTicket } from '@/hooks/useTicket'

declare global {
    interface Window {
        Razorpay: any
    }
}

const PaymentButton = ({
    event,
    user,
    amount,
    color = 'primary',
    ticketType,
}: any) => {
    const [isProcessing, setISProcessing] = useState(false)
    const { purchaseTicket }: any = useTicket()

    const handlePayment = async () => {
        setISProcessing(true)

        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                body: JSON.stringify({ amount: amount }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const data = await response.json()

            const options = {
                name: 'Smart Event Management ',
                description: 'Transaction',
                amount: 500,
                order_id: data.orderId,
                handler: function (response: any) {
                    console.log('Payment successful', response)
                    try {
                        purchaseTicket(
                            event,
                            user,
                            amount,
                            ticketType,
                            response
                        )
                        toast.success('You have successfully purchased ticket')
                    } catch {
                        toast.error('Error buying this ticket')
                    }
                },
                prefill: {
                    name: 'Piyush Kalyan',
                    email: 'kalyanpiyushp@gmail.com',
                    contact: '0972348623',
                },
                theme: {
                    color: '#101010',
                },
            }
            const rzp1 = new window.Razorpay(options)
            rzp1.open()
        } catch (error) {
            console.error('Payment failed', error)
        } finally {
            setISProcessing(false)
        }
    }
    return (
        <div className="bg-black">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <Button
                className="w-full"
                color="primary"
                onClick={() => {
                    handlePayment()
                }}
                disabled={isProcessing}
            >
                Buy ticket @ {amount}
            </Button>
        </div>
    )
}

export default PaymentButton
