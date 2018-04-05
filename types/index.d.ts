declare class Time {
  public minutes: number
  public seconds: number

  constructor(str: string)
}

interface ITime {
  minutes: number
  seconds: number
}

interface IStateTimer {
  timerLoop: NodeJS.Timer | null
  timeLeft: Time
  duration: Time
}

interface IState {
  timer: IStateTimer
}
