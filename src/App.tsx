import { useState } from 'react';
import "./App.css"
import MessageForm from './components/Message/MessageForm';
import { MesageProvider } from './components/Context/MesageContext';
import MessageTable from './components/Message/MessageTable';
import { Col, Row } from 'react-bootstrap';
function App() {
  const [isMessage, setIsMessage] = useState(false);
  const [showQR, setShowQR] = useState(false);
  return (
      <MesageProvider>
        <div className="container text-center mt-5">
          <Row style={{ width: "100%" }}>
            {!showQR && (
              <Col sm={6}>
                <MessageForm setIsMessage={setIsMessage} />
              </Col>
            )}
            <Col >
              <MessageTable isMessage={isMessage} setShowQR={setShowQR} showQR={showQR} />
            </Col>
          </Row>
        </div>
      </MesageProvider>
  );
}

export default App;
