import { useState, useEffect } from 'react';
import "./QrPage.css";

function QrPage() {
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [qrScanned, setQrScanned] = useState(false); // Estado para saber si el QR ha sido escaneado
    const [refreshQR, setRefreshQR] = useState(false);
    const apiUrl = import.meta.env.VITE_APP_API_URL || "";  // URL base de la API 
    //const wsUrl = import.meta.env.VITE_APP_WS_URL || "";    // URL base de WebSocket

    useEffect(() => {
        const startBot = async () => {
            try {
                const response = await fetch(`${apiUrl}/start-bot`
                );
                if (!response.ok) {
                    console.error('Error al iniciar el bot');
                }
            } catch (error) {
                console.error('Error al iniciar el bot:', error);
            }
        };

        startBot();

        const timer = setTimeout(() => {
            setRefreshQR(true);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    // useEffect(() => {
    //     // console.log("que?? = " + wsUrl)
    //     const wsock1 = new WebSocket(`ws://${wsUrl}`);
    //     // const wsock1 = new WebSocket(wsUrl);
    //     console.log(JSON.stringify(wsock1, null, 2))
    //     wsock1.onmessage = (message) => {
    //         const data = JSON.parse(message.data);
    //         if (data.type === 'QR_SCANNED') {
    //             setQrScanned(true);
    //             setRefreshQR(false); // Deja de refrescar el QR después de que se haya escaneado
    //         }
    //     };

    //     wsock1.onerror = (error) => {
    //         console.error('Error en WebSocket:', error);
    //     };

    //     wsock1.onclose = () => {
    //         console.log('WebSocket cerrado');
    //     };

    //     return () => {
    //         wsock1.close();
    //     };
    // }, [wsUrl]);

    useEffect(() => {
        const fetchQRCode = async () => {
            if (qrScanned) return;

            try {
                const response = await fetch(`${apiUrl}/get-qr`);
                if (response.ok) {
                    const data = await response.json();
                    const base64String = data.imageBase64;
                    setQrImage(`data:image/png;base64,${base64String}`);
                } else {
                    setQrImage('fallback.png');
                    console.error('Error al obtener el QR: ', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener el QR:', error);
            }
        };


        if (refreshQR && !qrScanned) {
            fetchQRCode();
        }

        const intervalId = setInterval(() => {
            if (refreshQR && !qrScanned) fetchQRCode();
        }, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, [refreshQR, qrScanned, apiUrl]);

    return (
        <div>
            {qrScanned ? (
                <div className='my-4 px-4 py-6 items-center justify-center text-center'>
                    <div className='flex justify-center'>
                        <div className="checkmark-icon" style={{ fontSize: '64px', color: '#22c55e' }}>✓</div>
                    </div>
                    <div>
                        <p className='text-black font-semibold text-xl'>
                            QR escaneado <span style={{ color: '#22c55e' }}>con éxito</span>.<br />
                            DanielBot está siendo ejecutado.
                        </p>
                        <p className='text-black m-4'>Por favor no cierre la pantalla. Si la cierra, el chatbot se detendrá.</p>
                    </div>
                </div>
            ) : (
                <img
                    src={qrImage || ''}
                    alt="QR Code"
                    className="mt-3"
                />
            )}
        </div>
    );
}

export default QrPage;

