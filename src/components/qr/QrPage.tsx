import { useState, useEffect } from 'react';
import "./QrPage.css";
import { useMessages } from '../Context/MesageContext';
import Loading from '../Spinner/Loading';

function QrPage() {
    const { messages } = useMessages();
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [qrScanned, setQrScanned] = useState(false); // Estado para saber si el QR ha sido escaneado
    const [refreshQR, setRefreshQR] = useState(false);
    const [qrName, setQrName] = useState("");
    const apiUrl = import.meta.env.VITE_APP_API_URL || ""; // URL base de la API 
    const key = import.meta.env.VITE_SECRET_KEY || ""; // Clave secreta

    useEffect(() => {
        const startBot = async () => {
            try {
                const response = await fetch(`${apiUrl}/start-bot`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ messages, key }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setQrName(data.botQrName); // Usa la respuesta del servidor como antes
                } else {
                    console.error('Error en la respuesta del servidor:', await response.text());
                }
            } catch (error) {
                console.error('Error al iniciar el bot:', error);
            }
        };

        startBot();
        setShowSpinner(true);
        const timer = setTimeout(() => {
            setShowSpinner(false);
            setRefreshQR(true);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const eventSource = new EventSource(`${apiUrl}/events?qrfile=${qrName}&key=${key}`);
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Datos recibidos:', data);
            if (!data.fileExists) {
                setShowSpinner(true); // Muestra el spinner
                setRefreshQR(false);

                // Espera 3 segundos antes de ocultar el spinner y marcar como escaneado
                setTimeout(() => {
                    setQrScanned(true);
                    setShowSpinner(false); // Oculta el spinner después de 3 segundos
                }, 5000);
            }
        };

        eventSource.onerror = (error) => {
            console.error('Error en EventSource:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [qrName]);


    useEffect(() => {
        const fetchQRCode = async () => {
            if (qrScanned) return;
            try {
                const response = await fetch(`${apiUrl}/get-qr/${qrName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': key,
                    },
                });

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
    }, [refreshQR, qrScanned]);

    return (
        <div>
            {showSpinner ? (
                <div className="spinner-container">
                    <Loading />
                </div>
            ) : qrScanned ? (
                <div className='my-4 px-4 py-6 items-center justify-center text-center'>
                    <div className='flex justify-center'>
                        <div className="checkmark-icon" style={{ fontSize: '64px', color: '#22c55e' }}>✓</div>
                    </div>
                    <div>
                        <p className='text-black font-semibold text-xl'>
                            QR escaneado <span style={{ color: '#22c55e' }}>con éxito</span>.<br />
                            ChatBot está siendo ejecutado.
                        </p>
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
