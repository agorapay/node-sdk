import Config from "../src/models/Config";
import AuthToken from "../src/models/AuthToken";
export declare class ApiRestError {
    resultCode: string;
    resultCodeMessage: string;
    constructor(resultCode: string, resultCodeMessage: string);
}
/**
 * ApiRest helper class to make requests to the AgoraPay API
 */
export default class ApiRest {
    private readonly config;
    /**
     * The authentication token shared between APIRest instances
     */
    private static readonly authToken;
    constructor(config: Config);
    protected sendToApiPost<T>(endPoint: string, payload: any, isMultiPart?: boolean): Promise<T>;
    protected sendToApiGet<T>(endPoint: string, payload: any): Promise<T>;
    /**
     * Set the authentication token to use
     * @remarks May be used in a serverless environment where the token is stored in a database.
     */
    protected setAuthTokenValue(token: AuthToken): void;
    /**
     * Get the authentication token as a copy
     */
    protected getCopiedAuthToken(): AuthToken;
    /**
     * Send an authenticated request to the API and refresh the token if needed
     */
    private sendAuthenticatedRequest;
    /**
     * Authenticate the user and update the token in the config
     */
    protected authenticate(): Promise<{
        id_token: string;
        access_token: string;
        expires_in: Date;
        scope: string;
        token_type: string;
    }>;
    private buildHeaders;
    private encodeValue;
    private log;
}
