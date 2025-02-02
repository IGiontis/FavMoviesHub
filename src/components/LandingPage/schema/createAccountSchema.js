const getCreateAccountSchema = () => {
  const schema = {
    fields: [
      {
        label: "User Name",
        type: "string",
        fieldType: "textfield",
        attribute: "userName",
        editable: true,
        validation: {
          is_not_null: true, // Required field
        },
      },
      {
        label: "First Name",
        type: "string",
        fieldType: "textfield",
        attribute: "firstName",
        editable: true,
        validation: {
          is_not_null: true, // Required field
        },
      },
      {
        label: "Last Name",
        type: "string",
        fieldType: "textfield",
        attribute: "lastName",
        editable: true,
        validation: {
          is_not_null: true, // Required field
        },
      },
      {
        label: "Email",
        type: "string",
        fieldType: "email",
        attribute: "email",
        editable: true,
        validation: {
          is_not_null: true, // Required field
        },
      },
      {
        label: "Phone Number",
        type: "number",
        fieldType: "textfield",
        attribute: "phoneNumber",
        editable: true,
        validation: {
          is_not_null: true, // Required field
        },
      },
      {
        label: "Password",
        type: "string",
        fieldType: "password",
        attribute: "password",
        editable: true,
        validation: {
          is_not_null: true, // Required field
        },
      },
      {
        label: "Confirm Password",
        type: "password",
        fieldType: "password",
        attribute: "confirmPassword",
        editable: true,
        validation: {
          is_not_null: true, // Required field
          matchWith: "password", // Custom property indicating it should match with "password"
        },
        placeholder: "Confirm Password",
      },
    ],
  };
  return schema;
};

export default getCreateAccountSchema;
