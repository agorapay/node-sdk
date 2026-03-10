export default class Utils {
    static stringToDate(dateString?: string): Date | undefined;
    static handleApiResponse<T>(promise: Promise<any>, mapper: (resp: any) => T): Promise<T>;
}
