import { RequirementFileType, RequirementStatus } from '../../utils/enums';
import Encodable from './Encodable';

class Requirement implements Encodable {
  /** Requirement identification number. */
  id: string;
  /** Type of file provided in fileContent (PDF). */
  fileExt?: string | undefined;
  /** Content of the document base64 encoded. */
  fileContent?: string | undefined;
  /** Document status. */
  status?: RequirementStatus | undefined;
  /** Date of validation of the document in ISO8601 format. */
  validationDate?: string | undefined;
  /** Date of document reception in ISO8601 format */
  receiptDate?: string | undefined;
  /**  */
  fileType?: RequirementFileType;

  constructor(
    id: string,
    fileExt: string,
    fileContent: string,
    fileType: RequirementFileType
  );
  /**
   * @constructor
   * @param data - Object which contains required requirement attributes.
   * @throws Will throw an error if one of the required attributes is missing.
   */
  constructor(data: { [key: string]: any });
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];
      if (!data.id) throw new Error('Missing required field: id');
      if (!data.mandatory) throw new Error('Missing required fielmandatory');
      if (!data.label) throw new Error('Missing required label');
      this.id = data.id;
      // this.label = data.label;
      this.fileExt = data.fileExt;
      this.fileContent = data.fileContent;

      if (
        data.status &&
        Object.values(RequirementStatus).some(
          (status: string) => status === data.status
        )
      )
        this.status = <RequirementStatus>data.status;
      else this.status = undefined;

      this.validationDate = data.validationDate;
      this.receiptDate = data.receiptDate;
    } else {
      this.id = args[0];
      this.fileExt = args[1];
      this.fileContent = args[2];
      this.fileType = args[3];
    }
  }

  encode(): { [key: string]: any } {
    return {
      id: this.id,
      fileExt: this.fileExt,
      fileContent: this.fileContent,
      status: this.status,
      validationDate: this.validationDate,
      receiptDate: this.receiptDate,
      fileType: this.fileType
    };
  }
}

export default Requirement;
