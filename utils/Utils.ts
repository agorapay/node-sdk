export default class Utils {

  static stringToDate(dateString?: string): Date | undefined {
    if (!dateString || dateString.length < 8) return undefined

    const year  = parseInt(dateString.substring(0,4))
    const month = parseInt(dateString.substring(4,6))
    const day   = parseInt(dateString.substring(6,8))
    return new Date(year, month-1, day)

  }


}