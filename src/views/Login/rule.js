export const mobileRules = [
  { required: true, message: '请填写手机号' },
  {
    pattern: /^1[3|5|7|8]\d{9}$/,
    message: '手机号格式错误'
  }
]

export const codeRules = [
  { required: true, message: '请填写验证码' },
  {
    pattern: /^\d{6}$/,
    message: '验证码格式错误'
  }
]
