export default function validator(data, config) {
  const errors = {}
  const validate = (config, data, validateMethod) => {
    switch (validateMethod) {
      case "isRequired":
        if (data.trim() === "") return config.message
        break
      case "isEmail":
        const emailReqExp = /^\S+@\S+\.\S+$/g
        if (!emailReqExp.test(data)) return config.message
        break
      case "isCapitalSymbol":
        const capitalReqExp = /[A-Z]+/g
        if (!capitalReqExp.test(data)) return config.message
        break
      case "isContainDigit":
        const containReqExp = /\d+/g
        if (!containReqExp.test(data)) return config.message
        break
      case "isLength":
        if (config.value > data.length) return config.message
        break
      default:
        break
    }
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
