import { Button, Modal, Form } from "react-bootstrap";
import { Message } from "../Interface/Message";
import { useFormik } from "formik";
import GenericMessageForm from "./GenericMessageForm";
import { useEffect, useState } from "react";
import { validationSchemaMessage } from "../YupValidation/YupValidation";

interface ModalMessageProps {
    show: boolean; // Indica si el modal debe mostrarse o no
    onHide: () => void; // Función que se ejecuta cuando el modal se cierra
    message: Message
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    refresh:boolean
}

const ModalMessage: React.FC<ModalMessageProps> = ({
    show,
    onHide,
    message,
    refresh,
    setRefresh
}) => {
    
    const [option, setOption] = useState("")
   let counter = 1
    const [showMoldal, setShowModal] = useState(false)
    const newMessage: Message = {
        id: Date.now().toString(),
        name: "",
        body: "",
        typeMessage: "",
        option: "",
        childMessages: [],
    };
    const handleSaveMessage = async (messageChild: Message) => {
        if (message.childMessages) {
            message.childMessages.push(messageChild);
        } else {
            message.childMessages = []
            message.childMessages.push(messageChild);
        }
        onHide()
    };

    // Configuración y gestión del formulario con Formik
    const formik = useFormik({
        initialValues: newMessage,
        validationSchema: validationSchemaMessage(option),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Message) => handleSaveMessage(obj),
    });
    useEffect(() => {
        setRefresh(false)
        if (option === "MENU") {
            // Si la opción es "MENU", setea el body con los títulos de los hijoss
            const bodyText = formik.values.childMessages
            ?.map((message) => `${counter++}) ${message.name}`) // Usamos el contador y luego lo incrementamos
            .join("\n"); // Unimos los mensajes con salto de línea
            formik.setFieldValue("body", bodyText);
        } 
    }, [refresh, formik.values.childMessages,option]);
    return (
        <>
            <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Opcion Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit} className="customFormMessage">
                        <GenericMessageForm formik={formik} setShowModal={setShowModal} setOption={setOption} />
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button
                                variant="success"
                                type="submit"
                                disabled={!formik.isValid}
                                className="formButtonMessage"
                                onClick={() => setRefresh(true)}
                            >
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal >
            {showMoldal && (
                <ModalMessage
                    onHide={() => setShowModal(false)}
                    show={showMoldal}
                    message={formik.values}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )

            }
        </>
    )
}
export default ModalMessage