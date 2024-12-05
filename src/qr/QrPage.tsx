import { useState, useEffect } from 'react';
import "./QrPage.css";

function QrPage() {
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [qrScanned, setQrScanned] = useState(false); // Estado para saber si el QR ha sido escaneado
    const [refreshQR, setRefreshQR] = useState(false);
    const [qrName, setQrName] = useState("");
    const apiUrl = import.meta.env.VITE_APP_API_URL || "";  // URL base de la API 

    useEffect(() => {
        const startBot = async () => {
            try {
                const response = await fetch(`${apiUrl}/start-bot`
                );
                if (response.ok) {
                    const data = await response.json();
                    setQrName(data.botQrName);
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

    useEffect(() => {
        const eventSource = new EventSource(`${apiUrl}/events?qrfile=${qrName}`); // Reemplaza con tu URL del servidor SSE
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Datos recibidos:', data);
            // Comprueba si isScanned es true
            if (!data.fileExists) {
                setQrScanned(true);
                setRefreshQR(false);
            }
        };

        eventSource.onerror = (error) => {
            console.error('Error en EventSource:', error);
            eventSource.close(); // Cierra la conexión si ocurre un error
        };

        return () => {
            eventSource.close(); // Limpia el EventSource cuando se desmonte el componente
        };
    }, [qrName]);

    useEffect(() => {
        const fetchQRCode = async () => {
            if (qrScanned) return;

            try {
                // Enviar el nombre del QR en el body
                const response = await fetch(`${apiUrl}/get-qr/${qrName}`);

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

