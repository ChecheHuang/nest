declare module 'express' {
  interface Request extends Request {
    user: {
      id: number
      username: string
      iat: number
      exp: number
    }
  }
}
