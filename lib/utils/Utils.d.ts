/**
 * Utility functions
 */
export default class Utils {
    static stringToDate(dateString?: string): Date | undefined;
    static hasEnumOrDefault<EnumClass extends {
        [key: string]: any;
    }, Opt>(value: unknown, enumType: EnumClass, defaultValue: EnumClass[keyof EnumClass] | Opt): EnumClass[keyof EnumClass] | Opt;
    static hasIntegerOrDefault<O>(value: any, defaultValue: number | O): number | O;
}
