const getSignInSchema = () => {
  const schema = {
    fields: [
      {
        label: "usernameEmail",
        type: "string",
        fieldType: "textfield",
        attribute: "usernameEmail",
        editable: true,
        placeholder: "Enter your username OR email address",
        autofocus:true,
        validationLabel:"Username or Email",
        validation: {
          is_not_null: true, 
        },
      },
      {
        label: "password",
        type: "password",
        fieldType: "password",
        attribute: "password",
        editable: true,
        validationLabel:"Password",
        validation: {
          is_not_null: true,
        },
      },
    ],
  };
  return schema;
};

export default getSignInSchema;
