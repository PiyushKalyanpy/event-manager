'use client'

import { useEffect, useRef, useState } from 'react'

import { BrowserMultiFormatReader } from '@zxing/library'
import { Button } from '@nextui-org/react'
import ScannerScreen from '@/components/scanner/ScannerScreen'
import { useEvent } from '@/hooks/useEvent'
import { useTicket } from '@/hooks/useTicket'

const BarcodeScanner = () => {
    const [state, setState] = useState({
        scanning: false,
        result: null as string | null,
        hasPermission: false,
        permissionRequested: false,
    })
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const codeReader = useRef(new BrowserMultiFormatReader())
    const { scannedTicket }: any = useTicket()
    const {events} : any = useEvent()
    console.log(events)

    useEffect(() => {
        if (state.scanning && state.hasPermission) startScanning()
        return () => stopScanning()
    }, [state.scanning, state.hasPermission])

    const requestCameraPermission = async () => {
        setState((prev) => ({ ...prev, permissionRequested: true }))
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
            })
            if (videoRef.current) videoRef.current.srcObject = stream
            setState((prev) => ({ ...prev, hasPermission: true, scanning: true }))
        } catch (err) {
            console.error('Camera permission denied or error occurred:', err)
            setState((prev) => ({ ...prev, hasPermission: false }))
        }
    }

    const startScanning = () => {
        if (!videoRef.current) return

        codeReader.current.decodeFromVideoDevice(
            null,
            videoRef.current,
            (result, err) => {
                if (result) {
                    const text = result.getText()
                    setState((prev) => ({
                        ...prev,
                        result: text,
                        scanning: false,
                    }))
                    scannedTicket(text)
                } else if (err && err.name !== 'NotFoundException') {
                    console.error(err)
                }
            }
        )
    }

    const stopScanning = () => {
        codeReader.current.reset()
        const stream = videoRef.current?.srcObject as MediaStream
        stream?.getTracks().forEach((track) => track.stop())
        if (videoRef.current) videoRef.current.srcObject = null
    }

    const handleClick = () => {
        if (!state.permissionRequested) {
            requestCameraPermission()
        } else {
            setState((prev) => ({ ...prev, result: null, scanning: true }))
        }
    }

    return (
        <div className="page-wrapper">
          <ScannerScreen/>
        </div>
    )
}

export default BarcodeScanner


