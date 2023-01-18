/**
 * AuthToken model to store token infos
 */
export default class AuthToken {
  public tokenValue?: string;
  public tokenExpiry: number = 0;
  public tokenId?: string;
  public tokenMethod: "GET" | "POST" = "POST";

  constructor(data: Partial<AuthToken>) {
    this.tokenValue = data.tokenValue;
    this.tokenExpiry = data.tokenExpiry ?? 0;
    this.tokenId = data.tokenId;
    this.tokenMethod = data.tokenMethod ?? "POST";
  }

  public get isInvalidOrExpired(): boolean {
    return !this.tokenValue || this.tokenExpiry < Date.now();
  }

  public equals(other: AuthToken): boolean {
    return this.tokenValue === other.tokenValue
      && this.tokenExpiry === other.tokenExpiry
      && this.tokenId === other.tokenId
      && this.tokenMethod === other.tokenMethod;
  }
}
