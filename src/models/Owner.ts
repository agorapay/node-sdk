import { Gender } from '../../utils/enums';
import Encodable from './Encodable';

/**
 * Class representing a person.
 */
class Owner implements Encodable {
  /**
   * * Male (M),
   * * Female (F)
   */
  gender: Gender;
  /**  */
  firstName: string;
  /**  */
  lastName: string;
  /**  */
  socialReason: string;
  /** */
  address: string;
  /** */
  city: string;
  /**  */
  postalCode: string;
  /** */
  country: string;

  /**
   * @constructor
   * @param gender
   * * Male (M),
   * * Female (F)
   * @param firstName -
   * @param lastName -
   * @param socialReason -
   * @param address -
   * @param city -
   * @param postalCode -
   * @param country -
   * @example
   * ````typescript
   *let person = new Person(Gender.Male, "John", "Doe", "john.doe@foo.com", "+14151231234", [Role.BeneficialOwner, Role.Manager])
   *
   * ````
   */
  constructor(
    gender: Gender,
    firstName: string,
    lastName: string,
    socialReason: string,
    address: string,
    city: string,
    postalCode: string,
    country: string
  ) {
    this.gender = gender;
    this.firstName = firstName;
    this.lastName = lastName;
    this.socialReason = socialReason;
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
  }

  encode(): { [key: string]: any } {
    return {
      gender: this.gender,
      firstName: this.firstName,
      lastName: this.lastName,
      socialReason: this.socialReason,
      address: this.address,
      city: this.city,
      postalCode: this.postalCode,
      country: this.country
    };
  }
}

export default Owner;
