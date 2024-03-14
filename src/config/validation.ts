interface FormObj {
  [key: string]: string;
}

export const getFormError = (errorName: string, isHebrew: boolean): string => {
  const formErrors: FormObj = {
    REQUIRED: isHebrew ? "זהו שדה חובה" : "This is a required field",
    INVALID_EMAIL: isHebrew ? "מייל שגוי" : "Wrong email",
    PASSWORD_LENGHT: isHebrew
      ? "אורך הסיסמה חייב להיות לפחות 5"
      : "Password length must be at least 5",
    PASSWORD_MISMATCH: isHebrew ? "הסיסמה חייבת להתאים" : "Password must match",
    INVALID_PHONE: isHebrew ? "מספר לא נכון" : "Wrong number",
  };

  return formErrors[errorName];
};

export const formErrors = {
  REQUIRED: "זהו שדה חובה",
  INVALID_EMAIL: "מייל שגוי",
  PASSWORD_LENGHT: "אורך הסיסמה חייב להיות לפחות 8",
  PASSWORD_MISMATCH: "הסיסמה חייבת להתאים",
  INVALID_PHONE: "מספר לא נכון",
  PERSON_ID_LENGHT: "המזהה צריך לכלול 9 תווים",
};
