import Encodable from './Encodable';

/**
 *
 */
class Authority implements Encodable {
  /** */
  authorityName: string;

  /**
   * @constructor
   * @param authorityName -
   */
  constructor(authorityName: string) {
    if (!authorityName)
      throw new Error('Missing required field: authorityName');
    this.authorityName = authorityName;
  }

  encode(): { [key: string]: any } {
    return {
      authorityName: this.authorityName
    };
  }
}

export default Authority;
