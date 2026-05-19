import { FileType } from '../../utils/enums.js';
import Requirement from './Requirement.js';
class UploadRequirement extends Requirement {
    constructor(id, fileExt, fileContent, fileType) {
        super(id, FileType[fileExt], fileContent, fileType);
    }
}
export default UploadRequirement;
