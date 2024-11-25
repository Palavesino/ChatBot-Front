import { useState} from 'react';
// const [qrImage, setQrImage] = useState<string | null>(null);
import "./App.css"
import QrPage from './qr/QrPage';
function App() {
  const [showQR, setShowQR] = useState(false);

  const handleButtonClick = async () => {
    setShowQR(true);
  };

  return (
    <div className="container text-center mt-5">
      {showQR ? (
        <QrPage />
      ) : (
        <button
          className="btn btn-success"
          onClick={handleButtonClick}
        >
          Generar QR
        </button>
      )}
    </div>
  );
}

export default App;
