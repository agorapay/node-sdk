export default interface Encodable {
    encode(): {
        [key: string]: any;
    };
}
