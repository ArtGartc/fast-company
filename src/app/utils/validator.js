export default function validator(data, config) {
  const errors = {};
  const validate = (config, data, validateMethod) => {
    switch (validateMethod) {
      case "isRequired":
        if (data.trim() === "") return config.message;
        break;

      default:
        break;
    }
  };
  for (const fieldName in data)
    for (const validateMethod in config[fieldName]) {
      let error = validate(
        config[fieldName][validateMethod],
        data[fieldName],
        validateMethod
      );
      if (error) errors[fieldName] = error;
    }
  return errors;
}
