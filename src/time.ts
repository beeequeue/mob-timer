export class Time {
  public minutes: number = 0
  public seconds: number = 0

  constructor(str?: string) {
    if (!str) return

    const match = str.match(/^(\d{2}):(\d{2})$/)

    if (!match || !match[1] || !match[2] || match[3]) {
      throw new Error('Invalid Time String')
    }

    this.minutes = Number(match[1])
    this.seconds = Number(match[2])
  }

  public toString() {
    return `${this.minutes < 10 ? '0' : ''}${this.minutes}:${
      this.seconds < 10 ? '0' : ''
    }${this.seconds}`
  }

  public reduceByOneSecond(): Time {
    const time = new Time(this.toString())

    if (time.minutes <= 0 && time.seconds - 1 <= 0) return new Time()

    time.seconds -= 1

    if (time.seconds < 0) {
      time.minutes -= 1
      time.seconds = 59
    }

    return time
  }
}
