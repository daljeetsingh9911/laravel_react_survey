import { CreateSurveyForm } from "./Types";

export const LoginFormInitValues = { email: '', password: '', rememberMe: false };

export const RegistrationFormInitValues = {fullName:'', email: '', password: '',confirmed:''};

export const CrateSurveyinitialValues:CreateSurveyForm = {
    image_url: "",
    title: "",
    status: false,
    description: undefined,
    expire_date: "",
    questions: []
};

export const InputFieldTypes:string[] =['text','textarea','radio','checkbox','select'];

export const showOptionIf:string[] = ['radio','checkbox','select'];