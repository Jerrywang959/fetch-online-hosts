declare global {
  const BETTER_UPTIME_TOKEN: string
}

export type Status = {
  data: {
    id: number,
    type: string,
    attributes: {
      name: string
      status: string
    }
  }[]
}


export { }
