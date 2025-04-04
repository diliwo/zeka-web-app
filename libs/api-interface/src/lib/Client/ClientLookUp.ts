
export interface IClientsLookUp {
  clientsLookUp?: ClientLookUp[] | undefined;
}

export class ClientsLookUp implements IClientsLookUp {
  clientsLookUp?: ClientLookUp[] | undefined;

  constructor(data?: IClientsLookUp) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['clients'])) {
        this.clientsLookUp = [] as any;
        for (let item of data['clients'])
          this.clientsLookUp!.push(ClientLookUp.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ClientsLookUp {
    data = typeof data === 'object' ? data : {};
    let result = new ClientsLookUp();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.clientsLookUp)) {
      data['clients'] = [];
      for (let item of this.clientsLookUp)
        data['clients'].push(item.toJSON());
    }
    return data;
  }
}

export interface IclientLookUp {
  clientId: string | null;
  email: string;
  name: string;
  ssn: string;
}

export class ClientLookUp implements IclientLookUp {
  clientId: string;
  email: string;
  name: string;
  ssn: string;

  constructor(data?: IclientLookUp) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.clientId = data['clientId'];
      this.name = data['name'];
      this.ssn = data['ssn'];
      this.email = data['email'];
    }
  }

  static fromJS(data: any): ClientLookUp {
    data = typeof data === 'object' ? data : {};
    let result = new ClientLookUp();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['clientId'] = this.clientId;
    data['name'] = this.name;
    data['ssn'] = this.ssn;
    return data;
  }
}
