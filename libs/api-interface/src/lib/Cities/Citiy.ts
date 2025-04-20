export interface ICity {
  id?: number;
  name: string;
  country: number;
}

export class City implements ICity {
  id?: number;
  name: string;
  country: number;

  static fromJS(data: any): City {
    data = typeof data === 'object' ? data : {};
    let result = new City();
    result.init(data);
    return result;
  }

  constructor(data?: City) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.id = data['id'];
      this.name = data['name'];
      this.country = data['country'];
    }
  }


  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['name'] = this.name;
    data['country'] = this.country;
    return data;
  }
}
