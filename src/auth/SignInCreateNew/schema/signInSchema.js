const getSignInSchema = () => {
  const schema = {
    fields: [
      {
        label: "Username/Email",
        type: "string",
        fieldType: "textfield",
        attribute: "usernameEmail",
        editable: true,
        placeholder: "Enter your username OR address",
        autofocus:true,
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
