import axios, {AxiosRequestConfig} from "axios";
import Config from "../src/models/Config";
import AuthToken from "../src/models/AuthToken";
import * as FormData from "form-data";

export class ApiRestError {
  resultCode: string;
  resultCodeMessage: string;

  constructor(resultCode: string, resultCodeMessage: string) {
    this.resultCode = resultCode;
    this.resultCodeMessage = resultCodeMessage;
  }
}

/**
 * ApiRest helper class to make requests to the AgoraPay API
 */
export default class ApiRest {
  /**
   * The authentication token shared between APIRest instances
   */
  private static readonly authToken: AuthToken = new AuthToken({});

  constructor(private readonly config: Config) {
  }

  protected async sendToApiPost<T>(endPoint: string, payload: any, isMultiPart: boolean = false): Promise<T> {
    return await this.sendAuthenticatedRequest({
      method: "POST",
      url: this.config.baseUrl + endPoint,
      data: payload ?? {},
      timeout: this.config.timeout,
      validateStatus: (status: number) => status == 200 || status == 401
    }, isMultiPart);
  }

  protected async sendToApiGet<T>(endPoint: string, payload: any): Promise<T> {
    return await this.sendAuthenticatedRequest({
      method: "GET",
      url: this.config.baseUrl + endPoint,
      params: payload,
      timeout: this.config.timeout,
      validateStatus: (status: number) => status == 200 || status == 401
    });
  }

  /**
   * Set the authentication token to use
   * @remarks May be used in a serverless environment where the token is stored in a database.
   */
  protected setAuthTokenValue(token: AuthToken): void {
    ApiRest.authToken.accessToken = token?.accessToken;
    ApiRest.authToken.tokenId = token?.tokenId;
    ApiRest.authToken.tokenExpiry = token?.tokenExpiry;
    ApiRest.authToken.tokenMethod = token?.tokenMethod;
  }

  /**
   * Get the authentication token as a copy
   */
  protected getCopiedAuthToken(): AuthToken {
    return new AuthToken(ApiRest.authToken);
  }

  /**
   * Send an authenticated request to the API and refresh the token if needed
   */
  private async sendAuthenticatedRequest(payload: AxiosRequestConfig, isMultiPart: boolean = false): Promise<any> {
    if (ApiRest.authToken.isInvalidOrExpired) {
      this.log("Token is invalid or expired, authenticating...");
      await this.authenticate();
      if (ApiRest.authToken.isInvalidOrExpired) {
        this.log("Token is still invalid or expired after authentication");
        throw new ApiRestError("Authentication error", "Looks like the authentication succeeded but the token is still invalid or expired");
      }
    }

    payload.headers = this.buildHeaders();

    let encodedData;
    if (isMultiPart) {
      const initialData = payload.data ?? {};
      const formData = new FormData();
      const boundary = formData.getBoundary();

      formData.append("json", JSON.stringify(initialData.json ?? {}), {contentType: "application/json; charset=UTF-8"});

      if (initialData.files) {
        initialData.files.forEach((file: any) => formData.append(file.name, Buffer.from(file.data).toString("base64"), {
          header: {"Content-Transfer-Encoding": "base64"},
          filename: file.fileName
        }));
      }

      encodedData = formData.getBuffer();
      payload.headers["Content-Type"] = `multipart/form-data; boundary=${boundary}`;
      payload.headers["Content-Length"] = formData.getLengthSync();
    } else {
      encodedData = this.encodeValue(payload.data ?? {});
      payload.headers["Content-Type"] = "application/json; charset=UTF-8";
    }

    this.log("Sending POST request to " + payload.url + " with payload:");
    this.log(payload);

    try {
      const response = await axios.request({...payload, data: encodedData});
      if (response.status === 401) {
        this.log("401: Token is invalid, authenticating...");
        return await this.sendAuthenticatedRequest(payload);
      } else if (response.data?.resultCode && response.data?.resultCode !== "0") {
        this.log("API returned error: " + response.data.resultCodeMessage);
        throw new ApiRestError(response.data.resultCode, response.data.resultCodeMessage ?? "No resultCodeMessage");
      }
      return response.data;
    } catch (error: any) {
      this.log("Request failed:");
      this.log(error.response?.data);
      this.log(error.response?.status);
      this.log(error.response?.statusText);

      if (error instanceof ApiRestError) {
        throw error;
      } else if (error?.response?.status === 400) {
        throw new ApiRestError(error.response?.data.resultCode.toString(), error.response.data.resultCodeMessage);
      }
      throw new ApiRestError(error.response?.status?.toString(), error.response?.statusText ?? "Unknown error");
    }
  }

  /**
   * Authenticate the user and update the token in the config
   */
  protected async authenticate(): Promise<{ id_token: string, access_token: string, expires_in: Date, scope: string, token_type: string }> {
    this.log("Authenticating user, POST to " + this.config.tokenUrl);

    try {
      const response = await axios.request({
        method: "POST",
        url: this.config.tokenUrl,
        timeout: this.config.timeout,
        headers: {
          "Authorization": "Basic " + Buffer.from(this.config.tokenUser + ":" + this.config.tokenPassword).toString("base64")
        }
      });

      const data = response.data;
      const tokenInfo = {
        id_token: data.id_token,
        access_token: data.access_token,
        expires_in: new Date(Date.now() + data.expires_in * 1000),
        token_type: data.token_type,
        scope: data.scope
      };

      ApiRest.authToken.accessToken = tokenInfo.access_token;
      ApiRest.authToken.tokenId = tokenInfo.id_token;
      ApiRest.authToken.tokenExpiry = tokenInfo.expires_in.getTime();
      ApiRest.authToken.tokenMethod = "POST";

      this.log("Authentication succeeded, token expires at " + tokenInfo.expires_in);
      this.log(tokenInfo);
      return tokenInfo;
    } catch (error: any) {
      this.log("Authentication failed: " + error.response?.data);
      throw new ApiRestError(
        error.response?.data.resultCode.toString() ?? "Unknown error authentication",
        error.response?.data.resultCodeMessage ?? "No resultCodeMessage"
      );
    }
  }

  private buildHeaders(): Record<string, string> {
    return {
      "Authorization": `${ApiRest.authToken.tokenType} ${ApiRest.authToken.accessToken}`,
      "id_token": ApiRest.authToken.tokenId
    };
  }

  private encodeValue(value: any): any {
    if (value === undefined || value === null) {
      return undefined;
    }

    if (value.encode) {
      return value.encode();
    } else if (Array.isArray(value)) {
      return value.reduce((acc: any[], item: any) => {
        const result = this.encodeValue(item);
        if (result !== undefined) {
          acc.push(result);
        }
        return acc;
      }, []);
    } else if (typeof value === "object") {
      return Object.keys(value).reduce((acc: any, key) => {
        const result = this.encodeValue(value[key]);
        if (result !== undefined) {
          acc[key] = result;
        }
        return acc;
      }, {});
    }

    return value;
  }

  private log(message: any) {
    if (this.config.debug) {
      console.dir(message, {depth: null, colors: true});
    }
  }
}
