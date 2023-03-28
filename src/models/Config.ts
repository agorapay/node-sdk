import Utils from "../../utils/Utils";

/**
 * Class representing a config.
 */
export default class Config {
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
  /** Enable debug mode. Default is `false`. */
  debug: boolean = false;

  /**
   * @param tokenUser - Token authentication username.
   * @param tokenPassword - Token authentication password.
   * @param tokenUrl - Token authentication URL.
   * @param baseUrl - CAPS Payment URL
   * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
   */
  constructor(tokenUser: string, tokenPassword: string, tokenUrl: string, baseUrl: string, timeout: number = 0, debug: boolean = false) {
    this.tokenUser = tokenUser;
    this.tokenPassword = tokenPassword;
    this.tokenUrl = tokenUrl;
    this.baseUrl = baseUrl;
    this.timeout = Utils.hasIntegerOrDefault(timeout, 0);
    this.debug = debug ?? false;
  }
}
