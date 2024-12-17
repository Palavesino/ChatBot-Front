import "./MessageTable.css";
import { useMessages } from "../Context/MesageContext";
import { OptionMessage } from "../Enum/OptionMessage";
import { MdDeleteForever } from "react-icons/md";
import React from "react";
import QrPage from "../qr/QrPage";
import { LiaQrcodeSolid } from "react-icons/lia";
interface MessageTableProps {
    isMessage: boolean
    showQR: boolean
    setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageTable: React.FC<MessageTableProps> = ({
    isMessage,
    showQR,
    setShowQR
}) => {
    const { messages, clearMessages } = useMessages();
    return (
        <>
            {(showQR ? (isMessage ? (
                <QrPage />
            ) : (<h1>NO Hay Mensajes </h1>)) : (
                <div className="containerTableMessage">
                    <div className="messages">
                        {messages.map((message, index) => (
                            <React.Fragment key={index}>
                                <div className={`message sent`}>
                                    {message.body}
                                </div>
                                {message.option !== OptionMessage.READ && (
                                    <div className="message received">
                                        Respuesta esperada del Usuario
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="iconsMessages">
                        <MdDeleteForever className="clearIcon" onClick={() => clearMessages()} />
                        {/* {isMessage && (showQR ? (
                        <QrPage />
                    ) : (
                        <button
                            className="buttonIconQR"
                            onClick={() => setShowQR(true)}
                        >
                            Generar <LiaQrcodeSolid />
                        </button>
                    ))} */}
                        <button
                            className="buttonIconQR"
                            onClick={() => setShowQR(true)}
                        >
                            Generar <LiaQrcodeSolid />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );

};

export default MessageTable;
