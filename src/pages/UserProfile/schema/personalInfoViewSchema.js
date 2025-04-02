const getPersonalInfoViewSchema = (user) => {
  const schema = {
    fields: [
      {
        label: "firstName", // Translation key
        type: "string",
        fieldType: "textfield",
        value: user.firstName,
        attribute: "firstName",
        editable: true,
      },
      {
        label: "userName",
        type: "string",
        fieldType: "textfield",
        value: user.username,
        attribute: "username",
        editable: true,
      },
      {
        label: "lastName",
        type: "string",
        fieldType: "textfield",
        value: user.lastName,
        attribute: "lastName",
        editable: true,
      },
      {
        label: "email",
        type: "string",
        fieldType: "email",
        value: user.email,
        attribute: "email",
        editable: true,
      },
      {
        label: "phoneNumber",
        type: "number",
        fieldType: "textfield",
        value: user.phoneNumber,
        attribute: "phoneNumber",
        editable: true,
      },
    ],
  };
  return schema;
};

export default getPersonalInfoViewSchema;
