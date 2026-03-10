import Config from '../src/models/Config';
declare class ApiRest {
    config: Config;
    constructor(config: Config);
    json_fields_toString(payload: any): void;
    sendToApiPost(endPoint: string, payload: any, multiPart?: boolean): Promise<any>;
    sendToApiGet(endPoint: string, payload: any): Promise<any>;
    sendRequest(message: any, success: (res: any, api: ApiRest) => void, failure: (error: any, api: ApiRest) => void): Promise<void>;
    authenticate(message: any, retry?: boolean): Promise<any>;
}
export default ApiRest;
