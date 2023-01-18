import ListingOptions from "./ListingOptions";

export default interface ListingResponse extends ListingOptions {
  /**
   * Numbers of records
   */
  lineCount: number;
}
