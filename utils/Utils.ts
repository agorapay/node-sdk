/**
 * Utility functions
 */
export default class Utils {

  public static stringToDate(dateString?: string): Date | undefined {
    if (!dateString || dateString.length < 8) {
      return undefined;
    }

    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6));
    const day = parseInt(dateString.substring(6, 8));
    return new Date(year, month - 1, day);
  }

  public static hasEnumOrDefault<EnumClass extends { [key: string]: any }, Opt>(value: unknown, enumType: EnumClass, defaultValue: EnumClass[keyof EnumClass] | Opt): EnumClass[keyof EnumClass] | Opt {
    const found: keyof EnumClass | undefined = Object.keys(enumType).find(v => enumType[v] === value);
    if (found) {
      return enumType[found];
    }
    return defaultValue;
  }

  public static hasIntegerOrDefault<O>(value: any, defaultValue: number | O): number | O {
    if (value !== null && value !== undefined) {
      try {
        return Number.parseInt(value, 10);
      } catch (ignored) {
      }
    }
    return defaultValue;
  }

}
