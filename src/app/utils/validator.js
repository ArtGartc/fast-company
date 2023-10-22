export default function validator(data, config) {
  const errors = {}

  const validate = (config, data, validateMethod) => {
    let statusValid
    switch (validateMethod) {
      case "isRequired":
        if (typeof data === "boolean") statusValid = !data
        else statusValid = data.trim() === ""
        break
      case "isEmail":
        const emailReqExp = /^\S+@\S+\.\S+$/g
        statusValid = !emailReqExp.test(data)
        break
      case "isCapitalSymbol":
        const capitalReqExp = /[A-Z]+/g
        statusValid = !capitalReqExp.test(data)
        break
      case "isContainDigit":
        const containReqExp = /\d+/g
        statusValid = !containReqExp.test(data)
        break
      case "isLength":
        statusValid = config.value > data.length
        break
      default:
        break
    }
    if (statusValid) return config.message
  }
  for (const fieldName in data)
    for (const validateMethod in config[fieldName]) {
      let error = validate(
        config[fieldName][validateMethod],
        data[fieldName],
        validateMethod
      )
      if (error && !errors[fieldName]) errors[fieldName] = error
    }
  return errors
}
