import ListingOptions from './ListingOptions.js';

interface ListingResponse extends ListingOptions {
  /**
   * Numbers of records
   */
  lineCount: number;
}

export default ListingResponse;
