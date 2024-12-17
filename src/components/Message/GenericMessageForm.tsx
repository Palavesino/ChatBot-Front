import { Button, Col, Form, Row } from "react-bootstrap";
import { FormikProps } from "formik";
import { Message } from "../Interface/Message";
import "./MessageForm.css"

interface GenericMessageFormProps {
    setOption: React.Dispatch<React.SetStateAction<string>>
    formik: FormikProps<Message>
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenericMessageForm: React.FC<GenericMessageFormProps> = ({
    formik,
    setShowModal,
    setOption,
}) => {
    // useEffect(() => {
    //     setRefresh(false)
    //     if (formik.values.option === "MENU") {
    //         // Si la opción es "MENU", setea el body con los títulos de los hijos
    //         const bodyText = formik.values.childMessages?.map((message) => message.name).join("\n");
    //         formik.setFieldValue("body", bodyText);
    //     } else {
    //         // Si no es "MENU", puedes limpiar o ajustar el valor del body
    //         formik.setFieldValue("body", "");
    //     }
    // }, [refresh]);

    return (
        <>
            <Row>
                <Col>
                    <Form.Group className="formGroupMessage">
                        <Form.Label className="formLabelMessage">Titulo</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            value={formik.values.name || ""}
                            onChange={formik.handleChange}
                            isInvalid={Boolean(
                                formik.errors.name && formik.touched.name
                            )}
                            className="formControlMessage"
                        />
                        <Form.Control.Feedback type="invalid" className="formFeedbackMessage">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="formGroupMessage">
                        <Form.Label className="formLabelMessage">Opcion</Form.Label>
                        <Form.Control
                            name="option"
                            as="select"
                            value={formik.values.option || ""}
                            onChange={(e) => {
                                formik.handleChange(e);
                                setOption(e.target.value);
                            }}

                            isInvalid={Boolean(
                                formik.errors.option && formik.touched.option
                            )}
                            className="formControlMessage"
                        >
                            <option value="">Selecciona una opcion</option>
                            <option value="MENU">Menu</option>
                            <option value="CAPTURE">Captura</option>
                            <option value="READ">Lectura</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid" className="formFeedbackMessage">
                            {formik.errors.option}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                {formik.values.option === "MENU" && (
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                onClick={() => setShowModal(true)}
                                className="formButtonMessage"
                            >
                                Agregar Opción
                            </Button>
                        </Col>
                    </Row>
                )}
            </Row>
            <Row>
                {formik.values.option !== "MENU" && (
                    <Col>
                        <Form.Group className="formGroupMessage">
                            <Form.Label className="formLabelMessage">Tipo</Form.Label>
                            <Form.Control
                                name="typeMessage"
                                as="select"
                                value={formik.values.typeMessage || ""}
                                onChange={formik.handleChange}
                                isInvalid={Boolean(
                                    formik.errors.typeMessage && formik.touched.typeMessage
                                )}
                                className="formControlMessage"
                            >
                                <option value="">Selecciona un tipo</option>
                                <option value="NUMBER">Capturar Numero </option>
                                <option value="SHOWNAME">Mostrar Nombre </option>
                                <option value="NAME">Capturar Nombre</option>
                                <option value="DEFAULT">DEFAULT </option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="formFeedbackMessage">
                                {formik.errors.typeMessage}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                )}
            </Row>
            <Row>
                <Col>
                    <Form.Group className="formGroupMessage">
                        <Form.Label className="formLabelMessage">Cuerpo</Form.Label>
                        <Form.Control
                            name="body"
                            as="textarea"
                            value={formik.values.body || ""}
                            onChange={formik.handleChange}
                            isInvalid={Boolean(
                                formik.errors.body && formik.touched.body
                            )}
                            className="formControlMessage"
                            readOnly={formik.values.option === "MENU"}
                        />
                        <Form.Control.Feedback type="invalid" className="formFeedbackMessage">
                            {formik.errors.body}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};

export default GenericMessageForm