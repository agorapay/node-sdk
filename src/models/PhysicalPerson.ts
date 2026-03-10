import Requirement from './Requirement';
import Encodable from './Encodable';
import { isEnumValue, Resident } from '../../utils/enums';

/**
 * Class representing a person.
 */
class PhysicalPersons implements Encodable {
  /**  */
  firstName: string;
  /**  */
  lastName: string;
  /**  */
  id: string;
  /**  */
  requirements: Array<Requirement> = [];
  /**  */
  resident?: Resident;
  /**  */
  physicalAddress?: string;

  /**
   * @constructor
   * @param data - Object which contains required physical person attributes.
   * @throws Will throw an error if one of the required attributes is missing.
   */
  constructor(data: { [key: string]: any });
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];

      if (!data.firstName) throw new Error('Missing required field: firstName');
      if (!data.lastName) throw new Error('Missing required field: lastName');
      if (!data.id) throw new Error('Missing required field: id');
      // if (!data.requirements) throw new Error('Missing required field: requirements')

      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.id = data.id;
      this.requirements = data.requirements
        ? data.requirements.map((x: any) => new Requirement(x))
        : [];
      this.resident = isEnumValue(Resident, data.resident)
        ? data.resident
        : undefined;
      this.physicalAddress = data.physicalAddress;
    } else {
      this.firstName = args[0];
      this.lastName = args[1];
      this.id = args[2];
      this.requirements = args[3];
      this.resident = isEnumValue(Resident, args[4]) ? args[4] : undefined;
      this.physicalAddress = args[5];
    }
  }

  encode(): { [key: string]: any } {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      id: this.id,
      requirements: this.requirements.map((x) => x.encode()),
      resident: this.resident,
      physicalAddress: this.physicalAddress
    };
  }
}

export default PhysicalPersons;
