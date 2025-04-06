const getCreateAccountSchema = () => {
  const schema = {
    fields: [
      {
        label: "username",
        type: "string",
        fieldType: "textfield",
        attribute: "username",
        editable: true,
        autofocus: true,
        validationLabel: "Username",
        validation: {
          is_not_null: true,
        },
      },
      {
        label: "firstName",
        type: "string",
        fieldType: "textfield",
        attribute: "firstName",
        editable: true,
        validationLabel: "First Name",
        validation: {
          is_not_null: true,
        },
      },
      {
        label: "lastName",
        type: "string",
        fieldType: "textfield",
        attribute: "lastName",
        editable: true,
        validationLabel: "Last Name",
        validation: {
          is_not_null: true,
        },
      },
      {
        label: "email",
        type: "string",
        fieldType: "email",
        attribute: "email",
        editable: true,
        validationLabel: "Email",
        validation: {
          is_not_null: true,
        },
      },
      {
        label: "phoneNumber",
        type: "number",
        fieldType: "textfield",
        attribute: "phoneNumber",
        editable: true,
      },
      {
        label: "password",
        type: "string",
        fieldType: "password",
        attribute: "password",
        validationLabel: "Password",
        editable: true,
        validation: {
          is_not_null: true,
        },
      },
      {
        label: "confirmPassword",
        type: "password",
        fieldType: "password",
        attribute: "confirmPassword",
        editable: true,
        validationLabel: "Confirm Password",
        validation: {
          is_not_null: true,
          matchWith: "password", // Custom property indicating it should match with "password"
        },
        placeholder: "Confirm Password",
      },
    ],
  };
  return schema;
};

export default getCreateAccountSchema;
