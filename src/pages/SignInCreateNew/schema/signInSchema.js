const getSignInSchema = () => {
  const schema = {
    fields: [
      {
        label: "User Name",
        type: "string",
        fieldType: "textfield",
        attribute: "userName",
        editable: true,
        placeholder: "Enter user name",
        validation: {
          is_not_null: true, // Required field
        },
      },
      {
        label: "Password",
        type: "password",
        fieldType: "password",
        attribute: "password",
        editable: true,
        validation: {
          is_not_null: true, // Required field
        },
      },
    ],
  };
  return schema;
};

export default getSignInSchema;
