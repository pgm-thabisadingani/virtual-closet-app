import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export const signupValidationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must match password.")
    .required("Confirm Password is required."),
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter a registered email")
    .label("Email")
    .email("Enter a valid email"),
});

export const clothingItemSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
});
export const challengeSchema = Yup.object().shape({
  eventTitle: Yup.string().required().label("Event title"),
  eventDate: Yup.date().required().nullable().label("Event Date"),
  Description: Yup.string().max(50, "Too Long!").label("Description"),
});
