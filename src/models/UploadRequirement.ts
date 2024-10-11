import { RequirementFileType, FileType } from '../../utils/enums';
import Requirement from './Requirement';

class UploadRequirement extends Requirement {

  constructor (
    id: string,
    fileExt: FileType,
    fileContent: string,
    fileType: RequirementFileType
  ) {
    super(id, FileType[fileExt], fileContent, fileType)
  }
}

export default UploadRequirement;
