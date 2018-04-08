export class Time {
  public readonly minutes: number
  public readonly seconds: number

  constructor(minutes: number = 0, seconds: number = 0) {
    this.minutes = this.clamp(minutes, 0, 99)
    this.seconds = this.clamp(seconds, 0, 59)
  }

  private clamp(x: number, min: number, max: number) {
    return Math.max(min, Math.min(x, max))
  }

  public toString() {
    return `${this.minutes < 10 ? '0' : ''}${this.minutes}:${
      this.seconds < 10 ? '0' : ''
    }${this.seconds}`
  }

  public reduceByOneSecond(): Time {
    const time = Time.fromTime(this)
    let newMinutes = time.minutes
    let newSeconds = time.seconds - 1

    if (newMinutes <= 0 && newSeconds <= 0) return new Time()

    if (newSeconds < 0) {
      newMinutes--
      newSeconds = 59
    }

    return new Time(newMinutes, newSeconds)
  }

  public static fromTime = (time: Time) => new Time(time.minutes, time.seconds)

  public static fromString = (str: string) => {
    const match = str.match(/^(\d{2}):(\d{2})$/)

    if (!match || !match[1] || !match[2] || match[3]) {
      throw new Error('Invalid Time String')
    }

    return new Time(Number(match[1]), Number(match[2]))
  }
}
