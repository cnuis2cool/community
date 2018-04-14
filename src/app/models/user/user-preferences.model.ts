export interface UserPreferences {
  key?: string,
  userId: string,
  notifications: boolean,
  holidays: {
    startDate: Date,
    endDate: Date
  }

}
