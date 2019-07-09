// Definition according to https://developer.mozilla.org/en-US/docs/Web/API/notification
interface INotificationOptions {
  body?: string
  data?: any
  dir?: NotificationDirection
  icon?: string
  badge?: string
  image?: string
  lang?: string
  tag?: string
  vibrate?: number[]
  sound?: HTMLAudioElement
  onClose?: (e: Event) => any
}

export function requestPermission() {
  Notification.requestPermission()
    .then()
    .catch()
}

export function notify(title: string, options?: INotificationOptions) {
  const notification = new Notification(title, options)

  if (options && options.sound) options.sound.play().then().catch()

  notification.onclick = () => {
    notification.close()
  }

  notification.onclose = e => {
    if (!options || typeof options.onClose !== 'function') return

    options.onClose(e)
  }

  setTimeout(() => notification.close(), 120 * 1000)

  return notification
}
