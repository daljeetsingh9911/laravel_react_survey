import * as Yup from 'yup';

export const LoginValidation = Yup.object({
        password: Yup.string()
                .min(5, 'Must be more than 5 characters or more')
                .required('The password is required'),
        email: Yup.string().email('Invalid email address').required('Email address is required'),
})



export const CreateSurveyValidation = Yup.object({
  title: Yup.string()
    .required('The title is required').min(3, 'The title should be at least 3 characters'),
  description: Yup.string()
    .required('The Description is required').min(10, 'The Description should have at least 10 characters'),
  expire_date: Yup.string()
    .required('The expire date is required')
});