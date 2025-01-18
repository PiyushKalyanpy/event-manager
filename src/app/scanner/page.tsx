'use client';

import { useEffect, useRef, useState } from 'react';

import { BrowserMultiFormatReader } from '@zxing/library'
import { Button } from '@nextui-org/react'
import Camera from './phoneperm'
import { useTicket } from '@/hooks/useTicket'

const BarcodeScanner = () => {
    const [scanning, setScanning] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [hasPermission, setHasPermission] = useState<boolean>(false)
    const [permissionRequested, setPermissionRequested] =
        useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const codeReader = useRef(new BrowserMultiFormatReader())

    const { scannedTicket }: any = useTicket()

    useEffect(() => {
        if (scanning && hasPermission) {
            startScanning()
        } else {
            stopScanning()
        }
        return () => stopScanning()
    }, [scanning, hasPermission])

    const requestCameraPermission = async () => {
        setPermissionRequested(true)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
            })
            setHasPermission(true)
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }

            startScanning()
        } catch (err) {
            console.error('Camera permission denied or error occurred: ', err)
            setHasPermission(false)
        }
    }

    const startScanning = () => {
        if (!videoRef.current) return

        const decodeBarcode = () => {
            if (videoRef.current) {
                codeReader.current.decodeFromVideoDevice(
                    null,
                    videoRef.current,
                    (result, err) => {
                        if (result) {
                            setResult(result.getText())
                            scannedTicket(result.getText())
                            setScanning(false)
                        } else if (err && err.name !== 'NotFoundException') {
                            console.error(err)
                        }
                    }
                )
            }
        }

        decodeBarcode()
    }

    const stopScanning = () => {
        codeReader.current.reset()

        const stream = videoRef.current?.srcObject as MediaStream
        const tracks = stream?.getTracks()
        if (tracks) {
            tracks.forEach((track) => track.stop())
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null
        }
    }

    const handleClick = () => {
        if (!permissionRequested) {
            requestCameraPermission()
        } else {
            setResult(null)
            setScanning(true)
        }
    }
 

  
    return (
        <div>
            <div>
                {/* Button to start scanning */}
                <Button onClick={handleClick}>Start Scanning</Button>
           
                {/* Show permission prompt message if not yet granted */}
                {!hasPermission && !permissionRequested && (
                    <div>
                        <p>Please grant camera access to start scanning.</p>
                        <Button onClick={requestCameraPermission}>
                            Grant Camera Access
                        </Button>
                    </div>
                )}

                {/* Show video stream once permission is granted */}
                {scanning && hasPermission && (
                    <div>
                        <video
                            ref={videoRef}
                            width="100%"
                            height="auto"
                            style={{ border: '1px solid black' }}
                            autoPlay
                            muted
                        />
                    </div>
                )}

                {/* Show a message if permission is denied */}
                {scanning && !hasPermission && (
                    <div>
                        <p>Please grant camera access to start scanning.</p>
                    </div>
                )}

                {/* Show scanned result */}
                {result && (
                    <div>
                        <h3>Scanned Result:</h3>
                        <p>{result}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BarcodeScanner
