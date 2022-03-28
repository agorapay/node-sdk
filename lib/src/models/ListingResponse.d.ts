import ListingOptions from './ListingOptions';
interface ListingResponse extends ListingOptions {
    /**
     * Numbers of records
     */
    lineCount: number;
}
export default ListingResponse;
