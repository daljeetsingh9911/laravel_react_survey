import { CreateSurveyForm } from "./Types";

export const LoginFormInitValues = { email: '', password: '', rememberMe: false };

export const RegistrationFormInitValues = {fullName:'', email: '', password: '',confirmPassword:''};

export const CrateSurveyinitialValues:CreateSurveyForm = {
    image_url: "",
    title: "",
    status: false,
    description: undefined,
    expire_date: ""
};
