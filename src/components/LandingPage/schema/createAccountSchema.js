const getCreateAccountSchema = () => {
  const schema = {
    fields: [
      {
        label: "User Name",
        type: "string",
        fieldType: "textfield",
        attribute: "userName",
        editable: true,
      },
      {
        label: "First Name",
        type: "string",
        fieldType: "textfield",
        attribute: "firstName",
        editable: true,
      },
      {
        label: "Last Name",
        type: "string",
        fieldType: "textfield",
        attribute: "lastName",
        editable: true,
      },
      {
        label: "Email",
        type: "string",
        fieldType: "email",
        attribute: "email",
        editable: true,
      },
      {
        label: "Phone Number",
        type: "number",
        fieldType: "textfield",
        attribute: "phoneNumber",
        editable: true,
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

export default getCreateAccountSchema;
