import * as Yup from "yup";


export const validationSchemaMessage = (option: string) => {
    return Yup.object({
        name: Yup.string().required("El título es obligatorio"),
        option: Yup.string()
            .required("Selecciona una opción")
            .oneOf(["MENU", "CAPTURE", "READ"], "Opción no válida"),
        // typeMessage: option !== 'MENU' ? Yup.string()
        //     .required('Selecciona un tipo')
        //     .oneOf(['NUMBER', 'SHOWNAME', 'NAME', 'DEFAULT'], 'Tipo no válido') :
        //     Yup.mixed().nullable(),
        // body: option !== 'MENU' ? Yup.string().required("El cuerpo es obligatorio") :
        //     Yup.mixed().nullable(),  // Asegura que el campo sea realmente opcional cuando "MENU"
    });
};
