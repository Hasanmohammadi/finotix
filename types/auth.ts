export interface LoginResultI {
  user: UserI
  tokenDetail: TokenDetailI
}
export interface TokenDetailI {
  token: string
  refreshToken: string
  expireDateTime: string
}
export interface UserI {
  id: string
  userName: string
  forceChangePassword: boolean
}
