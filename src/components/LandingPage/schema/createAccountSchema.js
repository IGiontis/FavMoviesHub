const getCreateAccountSchema = () => {
  const schema = {
    fields: [
      {
        label: "Title",
        type: "string",
        fieldType: "textfield",
        attribute: "descr",
        editable: true,
        viewable: false,
      },
    ],
  };
  return schema;
};

export default getCreateAccountSchema;
