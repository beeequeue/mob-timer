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
}

export function requestPermission() {
  Notification.requestPermission()
}

export function notify(title: string, options?: INotificationOptions) {
  if (!('Notification' in window)) return

  if ((Notification as any).permission !== 'granted') return

  const notification = new Notification(title, options)

  setTimeout(notification.close, 15 * 1000)
}
