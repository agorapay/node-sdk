/** Class representing a config. */
class Config {
  /** Token authentication username. */
  tokenUser: string;
  /** Token authentication password. */
  tokenPassword: string;
  /** Token authentication URL. */
  tokenUrl: string;
  /** CAPS Payment URL */
  baseUrl: string;
  /** HTTP requests timeout. Default is `0` (no timeout). */
  timeout: number;

  tokenValue?: string;
  tokenExpiry = 0;
  tokenId?: string;
  tokenMethod = 'POST';

  /**
   *
   * @param tokenUser - Token authentication username.
   * @param tokenPassword - Token authentication password.
   * @param tokenUrl - Token authentication URL.
   * @param baseUrl - CAPS Payment URL
   * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
   */
  constructor(
    tokenUser: string,
    tokenPassword: string,
    tokenUrl: string,
    baseUrl: string,
    timeout = 0
  ) {
    this.tokenUser = tokenUser;
    this.tokenPassword = tokenPassword;
    this.tokenUrl = tokenUrl;
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }
}

export default Config;
