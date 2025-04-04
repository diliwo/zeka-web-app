/* eslint-disable prefer-const */
import { Injectable, Optional, Inject, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import {
  Client,
  ClientLookUp,
  ClientsLookUp,
} from '@frontend/api-interface';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import * as servicesLib from './share';
//import { API_BASE_URL } from '@frontend/core-data';

//export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export interface IClientService {
  allClientsLookUp(): Observable<ClientsLookUp>;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService implements IClientService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(servicesLib.API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : '';
  }

  allClientsLookUp(): Observable<ClientsLookUp> {
    let url_ = this.baseUrl + '/api/clients';
    url_ = url_.replace(/[?&]$/, '');
    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAll(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAll(<any>response_);
            } catch (e) {
              return <Observable<ClientsLookUp>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ClientsLookUp>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGetAll(
    response: HttpResponseBase
  ): Observable<ClientsLookUp> {
    const status = response.status;

    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ClientsLookUp.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return servicesLib.throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<ClientsLookUp>(<any>null);
  }

  getclientByClientId(clientId: number): Observable<Client> {
    let url_ = this.baseUrl + '/api/clients/{clientid}';
    if (clientId === undefined || clientId === null)
      throw new Error("The parameter 'clientid' must be defined.");
    url_ = url_.replace('{clientid}', encodeURIComponent('' + clientId));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGet(<any>response_);
            } catch (e) {
              return <Observable<Client>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<Client>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGet(
    response: HttpResponseBase
  ): Observable<Client> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = Client.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 404) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = servicesLib.ProblemDetails.fromJS(resultData404);
          return servicesLib.throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return servicesLib.throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<Client>(<any>null);
  }

  import(niss: string): Observable<number> {
    let url_ = this.baseUrl + '/api/s/{niss}/import';
    url_ = url_.replace('{niss}', encodeURIComponent('' + niss));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(niss);
    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processImport(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processImport(<any>response_);
            } catch (e) {
              return <Observable<number>>(<any>_observableThrow(e));
            }
          } else return <Observable<number>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processImport(response: HttpResponseBase): Observable<number> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : parseInt(_responseText);
          return _observableOf<number>(resultData200);
        })
      );
    } else {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
          return servicesLib.throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  updateLanguage(niss: string, language: string): Observable<void> {
    console.log(niss,language);
    let url_ = this.baseUrl + '/api/clients/updatelanguage/{niss}/{language}';
    url_ = url_.replace('{niss}', encodeURIComponent('' + niss));
    url_ = url_.replace('{language}', encodeURIComponent('' + language));
    url_ = url_.replace(/[?&]$/, '');
    console.log(url_);

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateLanguage(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateLanguage(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUpdateLanguage(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return _observableOf<void>(<any>null);
        })
      );
    } else {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
          return servicesLib.throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }


  getClientBySearch(text : string): Observable<ClientsLookUp> {
    let url_ = this.baseUrl + '/clients/searchtext/{text}';
    url_ = url_.replace('{text}', encodeURIComponent('' + text));
    url_ = url_.replace(/[?&]$/, '');
    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetclientBySearch(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetclientBySearch(<any>response_);
            } catch (e) {
              return <Observable<ClientsLookUp>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ClientsLookUp>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGetclientBySearch(
    response: HttpResponseBase
  ): Observable<ClientsLookUp> {
    const status = response.status;

    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ClientsLookUp.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return servicesLib.throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<ClientsLookUp>(<any>null);
  }

}
