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
      },
      {
        label: "Password",
        type: "password",
        fieldType: "password",
        attribute: "password",
        editable: true,
      },
    ],
  };
  return schema;
};

export default getSignInSchema;
