export const FCM_ACTIONS = {
  OPEN_WEBVIEW: 'OPEN_WEBVIEW',
  DEFAULT: 'DEFAULT',
} as const;

export const FCM_SCREENS = {
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  COLUMN: 'COLUMN',
  DEFAULT: 'DEFAULT',
} as const;

export type FcmActionType = typeof FCM_ACTIONS[keyof typeof FCM_ACTIONS];
export type FcmScreenType = typeof FCM_SCREENS[keyof typeof FCM_SCREENS];

export function isFcmActionType(value: any): value is FcmActionType {
  return Object.values(FCM_ACTIONS).includes(value);
}

export function isFcmScreenType(value: any): value is FcmScreenType {
  return Object.values(FCM_SCREENS).includes(value);
}
