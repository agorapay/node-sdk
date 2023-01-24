import axios, { AxiosRequestConfig } from "axios";
import Config from "../src/models/Config";
import AuthToken from "../src/models/AuthToken";

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
  private static readonly authToken: AuthToken;

  constructor(private readonly config: Config) {
  }

  protected sendToApiPost<T>(endPoint: string, payload: any, base64: boolean = false): Promise<T> {
    return this.sendAuthenticatedRequest({
      method: "POST",
      url: this.config.baseUrl + endPoint,
      data: this.jsonFieldsToString(payload),
      timeout: this.config.timeout,
      validateStatus: (status: number) => status == 200 || status == 401
    }, base64);
  }

  protected sendToApiGet<T>(endPoint: string, payload: any): Promise<T> {
    return this.sendAuthenticatedRequest({
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
  protected setAuthTokenValue(token: AuthToken) {
    ApiRest.authToken.tokenValue = token?.tokenValue;
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
  private sendAuthenticatedRequest(payload: AxiosRequestConfig, isBase64: boolean = false): Promise<any> {
    if (ApiRest.authToken?.isInvalidOrExpired) {
      return this.authenticate()
        .then(() => {
          if (ApiRest.authToken?.isInvalidOrExpired) {
            throw new ApiRestError("Authentication error", "Looks like the authentication succeeded but the token is still invalid or expired");
          }

          return this.sendAuthenticatedRequest(payload);
        });
    }

    payload.headers = this.buildHeaders();
    if (isBase64) {
      payload.headers["Content-Transfer-Encoding"] = "base64";
    }

    return axios.request(payload)
      .then(response => {
        if (response.status === 401) {
          return this.sendAuthenticatedRequest(payload);
        } else if (response.data?.resultCode && response.data?.resultCode !== "0") {
          throw new ApiRestError(response.data.resultCode, response.data.resultCodeMessage ?? "No resultCodeMessage");
        }
        return response.data;
      })
      .catch((error: any) => {
        if (error instanceof ApiRestError) {
          throw error;
        } else if (error?.response?.status === 400) {
          throw new ApiRestError(error.response.data.resultCode.toString(), error.response.data.resultCodeMessage);
        }
        throw new ApiRestError(error.response.status.toString(), error.response.statusText);
      });
  }

  /**
   * Authenticate the user and update the token in the config
   */
  protected authenticate(): Promise<{ id_token: string, access_token: string, expires_in: Date }> {
    return axios.request({
      method: ApiRest.authToken.tokenMethod,
      url: this.config.tokenUrl,
      timeout: this.config.timeout,
      headers: {
        "Authorization": "Basic " + Buffer.from(this.config.tokenUser + ":" + this.config.tokenPassword).toString("base64")
      }
    })
      .then(response => {
        const data = response.data;
        const tokenInfo = {
          id_token: data.id_token,
          access_token: data.access_token,
          expires_in: new Date(Date.now() + data.expires_in * 1000)
        };

        ApiRest.authToken.tokenValue = tokenInfo.access_token;
        ApiRest.authToken.tokenId = tokenInfo.id_token;
        ApiRest.authToken.tokenExpiry = tokenInfo.expires_in.getTime();

        return tokenInfo;
      })
      .catch((error: any) => {
        throw new ApiRestError(error.response.data.resultCode.toString(), error.response.data.resultCodeMessage);
      });
  }

  private buildHeaders(): Record<string, string> {
    return {
      "Authorization": `Bearer ${ApiRest.authToken?.tokenValue}`,
      "id_token": `${ApiRest.authToken?.tokenId}`
    };
  }

  private jsonFieldsToString(payload: Record<string, any>): Record<string, any> {
    return Object.keys(payload).reduce((acc, key) => {
      if (payload[key] === undefined || payload[key] === null) {
        return acc;
      }

      if (payload[key].encode) {
        acc[key] = payload[key].encode();
      } else if (typeof payload[key] === "object") {
        acc[key] = this.jsonFieldsToString(payload[key]);
      } else {
        acc[key] = payload[key].toString();
      }

      return acc;
    }, {} as Record<string, any>);
  }
}
