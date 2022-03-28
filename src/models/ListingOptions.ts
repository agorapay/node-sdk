interface ListingOptions {
  /**
   * Numbers of ligne in reporting. Limited to 100
   */
  pagination?: number;
  /**
   * Start response line. Set to 0 when not indicated
   */
  offset?: number;
}

export default ListingOptions;
