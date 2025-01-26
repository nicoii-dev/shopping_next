import * as yup from 'yup';

export const SignupSchema = yup
  .object({
    first_name: yup.string().required('First name is required').min(2, 'First name must be atleast 2 letters').matches(/^[A-Za-z\s]*$/, 'Letters only'),
    last_name: yup.string().required('Last name is required').min(2, 'Last name must be atleast 2 letters').matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-/.]+$/, 'Letters only'),
    dob: yup.string().required('Birthday is required'),
    phone_number: yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Numbers only').min(11, 'Phone number must be 11 digits').matches(/^(09|\+639)\d{9}$/gm, 'Invalid phone number'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Please enter your Email'),
    password: yup.string().required('Please enter your Password').min(6),
    password_confirmation: yup
      .string()
      .required('Please enter your Password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();