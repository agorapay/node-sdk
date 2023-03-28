/**
 * AuthToken model to store token infos
 */
export default class AuthToken {
  public accessToken?: string;
  public tokenExpiry: number = 0;
  public tokenId: string;
  public tokenMethod: "GET" | "POST" = "POST";
  public tokenType: "Bearer" = "Bearer";

  constructor(data: Partial<AuthToken>) {
    this.accessToken = data.accessToken;
    this.tokenExpiry = data.tokenExpiry ?? 0;
    this.tokenId = data.tokenId ?? "";
    this.tokenMethod = data.tokenMethod ?? "POST";
    this.tokenType = data.tokenType ?? "Bearer";
  }

  public get isInvalidOrExpired(): boolean {
    return !this.accessToken || !this.tokenExpiry || this.tokenExpiry < Date.now();
  }

  public equals(other?: AuthToken): boolean {
    if (!other) {
      return false;
    }

    return this.accessToken === other.accessToken
      && this.tokenExpiry === other.tokenExpiry
      && this.tokenId === other.tokenId
      && this.tokenMethod === other.tokenMethod
      && this.tokenType === other.tokenType;
  }
}
