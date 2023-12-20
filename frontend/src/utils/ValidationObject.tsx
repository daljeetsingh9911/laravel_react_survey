import * as Yup from 'yup';
import { showOptionIf } from './initValues';

export const LoginValidation = Yup.object({
  password: Yup.string()
    .min(5, 'Must be more than 5 characters')
    .required('The password is required'),
  email: Yup.string().email('Invalid email address').required('Email address is required'),
})

export const RegistrarionValidation = Yup.object({
  password: Yup.string()
    .min(5, 'Must be more than 5 characters')
    .required('The password is required'),
  email: Yup.string().email('Invalid email address').required('Email address is required'),
  fullName: Yup.string()
    .required('Name of the user is required')
    .min(5, 'Name Must be 5 characters or more'),
  confirmed: Yup.string()
    .required('The Confirm password field is required')
    .oneOf([Yup.ref('password')], 'Password must match')
})



export const CreateSurveyValidation = Yup.object({
  title: Yup.string()
    .required('The title is required').min(3, 'The title should be at least 3 characters'),
  description: Yup.string()
    .required('The Description is required').min(10, 'The Description should have at least 10 characters'),
  expire_date: Yup.string()
    .required('The expire date is required'),
  questions: Yup.array().test('hasQuestions', 'At least one question is required', function (value): any {
    // Check if questions array is non-empty
    if (value && value.length > 0) {
      // Validate each question
      return Yup.array().of(
        Yup.object().shape({
          question: Yup.string().required('Question is required'),
          description: Yup.string().required('Description is required'),
          type: Yup.string(),
          data: Yup.array().test('options', 'At least two non-empty options are required for checkboxes, radios, and selects', function (dataValue) {
            const type = this.parent.type;
            if (showOptionIf.includes(type)) {
              return Array.isArray(dataValue) && dataValue.length >= 2 && dataValue.every(option => option !== '' && option !== null);
            }
            return true; // If not checkbox, radio, or select, no specific requirement
          }),
        }),
      ).validateSync(value, { abortEarly: false });
    }
    return true; // If questions array is empty, no specific validation
  }).min(1, 'At least one question is required'),
});