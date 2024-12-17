import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { Message } from "../Interface/Message";
import "./MessageForm.css"
import GenericMessageForm from "./GenericMessageForm";
import { useEffect, useState } from "react";
import ModalMessage from "./ModalMessage";
import { validationSchemaMessage } from "../YupValidation/YupValidation";
import { useMessages } from "../Context/MesageContext";
interface MessageFormProps {
    setIsMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageForm: React.FC<MessageFormProps> = ({
    setIsMessage

}) => {
    const { messages, addToMessages } = useMessages();
    const [showMoldal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [option, setOption] = useState("");
    const [childMessage, setChildMessage] = useState<Message[]>([]);
    let counter = 1;
    useEffect(() => {
        if (messages.length > 0) {
            setIsMessage(true)
        } else {
            setIsMessage(false)
        }

    }, [messages]);

    const message: Message = {
        id: Date.now().toString(),
        name: "",
        body: "",
        typeMessage: "",
        option: "",
        childMessages: null
    };

    const handleSaveMessage = async (message: Message) => {
        console.log("message =  " + JSON.stringify(message, null, 2));
        addToMessages(message);
        setChildMessage([]);
        formik.resetForm()
        // await formikResetImputs();
    };



    // Configuración y gestión del formulario con Formik 
    const formik = useFormik({
        initialValues: message,
        validationSchema: validationSchemaMessage(option),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Message) => handleSaveMessage({ ...obj, childMessages: childMessage }),
    });

    useEffect(() => {
        setRefresh(false);
        if (option === "MENU") {
            // Si la opción es "MENU", setea el body con los títulos de los hijos
            const bodyText = childMessage
                .map((message) => `${counter++}) ${message.name}`) // Usamos el contador y luego lo incrementamos
                .join("\n"); // Unimos los mensajes con salto de línea
            formik.setFieldValue("body", bodyText);
        }
    }, [refresh, option, childMessage]);

    return (
        <>
            <div className="containerFormMessage">
                <h2 className="titleMessage">Crear tu Mensaje</h2>
                <Form onSubmit={formik.handleSubmit} className="customFormMessage">
                    <GenericMessageForm
                        formik={formik}
                        setShowModal={setShowModal}
                        setOption={setOption}
                    />
                    <Button
                        variant="success"
                        type="submit"
                        disabled={!formik.isValid}
                        className="formButtonMessage"
                        onClick={() => setRefresh(true)}
                    >
                        Guardar
                    </Button>
                </Form>
                {showMoldal && (
                    <ModalMessage
                        onHide={() => setShowModal(false)}
                        show={showMoldal}
                        message={{ ...formik.values, childMessages: childMessage }}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                )}
            </div>
        </>
    );
};
export default MessageForm;
