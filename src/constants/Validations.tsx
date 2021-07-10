export const isValidEmail = (email: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
  return reg.test(email)
}

export const isValidPassword = (password: string) => {
  if (password.length < 8) {
    return false
  } else {
    var hasNumber = /^(?=.{8,}$)(?=.*?[A-Z])(?=.*?[0-9]).*$/;
    return hasNumber.test(password)
  }
}