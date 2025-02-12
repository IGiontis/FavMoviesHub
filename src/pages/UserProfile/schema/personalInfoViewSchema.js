const getPersonalInfoViewSchema = (user) => {
  const schema = {
    fields: [
      {
        label: "First Name",
        type: "string",
        fieldType: "textfield",
        value: user.firstName,
        attribute: "firstName",
        editable: true,
      },
      {
        label: "Username",
        type: "string",
        fieldType: "textfield",
        value: user.username,
        attribute: "username",
        editable: true,
      },
      {
        label: "Last Name",
        type: "string",
        fieldType: "textfield",
        value: user.lastName,
        attribute: "lastName",
        editable: true,
      },
      {
        label: "Email",
        type: "string",
        fieldType: "email",
        value: user.email,
        attribute: "email",
        editable: true,
      },
      {
        label: "Phone Number",
        type: "number",
        fieldType: "textfield",
        value: user.phoneNumber,
        attribute: "phoneNumber",
        editable: true,
      },
      //   {
      //     label: "Password",
      //     type: "string",
      //     fieldType: "password",
      //     attribute: "password",
      //     editable: true,
      //   },
    ],
  };
  return schema;
};

export default getPersonalInfoViewSchema;
