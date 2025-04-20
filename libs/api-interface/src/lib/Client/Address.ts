export interface IAddress {
  number: string;
  name: string;
  postalCode: string;
  city: string;
  country:string;
}

export class Address implements IAddress {
  number: string;
  name: string;
  city: string;
  postalCode: string;
  country:string;

  constructor(data?: Address) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.number = data['number'];
      this.name = data['name'];
      this.city = data['city'];
      this.postalCode = data['postalCode'];
      this.country = data['country'];
    }
  }

  static fromJS(data: any): Address {
    data = typeof data === 'object' ? data : {};
    let result = new Address();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['number'] = this.number;
    data['name'] = this.name;
    data['city'] = this.city;
    data['postalCode']= this.postalCode;
    data['country'] = this.country;
    return data;
  }
}
