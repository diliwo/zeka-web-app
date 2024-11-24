import { Injectable, Optional, Inject, InjectionToken} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { JobsListVm, JobDetail, Reward, Rewards, JobOccupants } from '@frontend/api-interface';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import * as servicesLib from './share';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
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

  allJobs(
    pageNumber: number,
    pageSize: number,
    filter: string = '',
    getOnlyjobWithOpenjobOffer: boolean = false,
    orderBy:string="jobtitle asc"): Observable<JobsListVm> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('pageNumber', pageNumber.toString())
    httpParams = httpParams.append('pageSize', pageSize.toString())

    if(getOnlyjobWithOpenjobOffer){
      httpParams = httpParams.append('getOnlyjobWithOpenjobOffer', getOnlyjobWithOpenjobOffer.toString())
    }

    if(filter){
      httpParams = httpParams.append('filter', filter)
    }

    if(orderBy){
      httpParams = httpParams.append('orderBy',orderBy);
    }

    let url_ = this.baseUrl + '/api/jobs';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      params: httpParams,
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
              return <Observable<JobsListVm>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<JobsListVm>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetAll(response: HttpResponseBase): Observable<JobsListVm> {
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
          result200 = JobsListVm.fromJS(resultData200);
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
    return _observableOf<JobsListVm>(<any>null);
  }

  upsert(command: JobDetail): Observable<void> {
    let url_ = this.baseUrl + '/api/jobs';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);
    console.log(content_);
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
          return this.processUpsert(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpsert(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUpsert(response: HttpResponseBase): Observable<void> {
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

  rewards(): Observable<Rewards> {
    let url_ = this.baseUrl + '/api/jobs/rewards';
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
          return this.processRewards(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRewards(<any>response_);
            } catch (e) {
              return <Observable<Rewards>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<Rewards>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processRewards(
    response: HttpResponseBase
  ): Observable<Rewards> {
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
          result200 = Rewards.fromJS(resultData200);
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
    return _observableOf<Rewards>(<any>null);
  }

  updateDates(command: JobDetail): Observable<void> {
    let url_ = this.baseUrl + '/api/jobs/dates';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);
    console.log(content_);
    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateDates(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateDates(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUpdateDates(response: HttpResponseBase): Observable<void> {
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

  delete(id: number): Observable<void> {
    console.log(id);
  let url_ = this.baseUrl + "/api/jobs/{id}";
  if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
  url_ = url_.replace("{id}", encodeURIComponent("" + id));
  url_ = url_.replace(/[?&]$/, "");

  let options_ : any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
      })
  };

  return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
      return this.processDelete(response_);
  })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
          try {
            console.log(response_);
              return this.processDelete(<any>response_);
          } catch (e) {
            console.log(e);
              return <Observable<void>><any>_observableThrow(e);
          }
      } else
          return <Observable<void>><any>_observableThrow(response_);
  }));
}

protected processDelete(response: HttpResponseBase): Observable<void> {
  const status = response.status;
  const responseBlob =
      response instanceof HttpResponse ? response.body :
      (<any>response).error instanceof Blob ? (<any>response).error : undefined;

  let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
  if (status === 204) {
      return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
      return _observableOf<void>(<any>null);
      }));
  } else {
      return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
      let resultdefault: any = null;
      let resultDatadefault = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
      resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
      return servicesLib.throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
      }));
  }
}

getOccupants(pageNumber: number, pageSize: number,jobid: number, filter: string = ''): Observable<JobOccupants> {
  let httpParams = new HttpParams();
  httpParams = httpParams.append('pageNumber', pageNumber.toString())
  httpParams = httpParams.append('pageSize', pageSize.toString())

  if(jobid){
    httpParams = httpParams.append('jobid', jobid.toString())
  }

  if(filter){
    httpParams = httpParams.append('filter', filter)
  }

  let url_ = this.baseUrl + '/api/jobs/occupants';
  url_ = url_.replace(/[?&]$/, '');

  let options_: any = {
    observe: 'response',
    responseType: 'blob',
    params: httpParams,
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };

  return this.http
    .request('get', url_, options_)
    .pipe(
      _observableMergeMap((response_: any) => {
        return this.processGetOccupants(response_);
      })
    )
    .pipe(
      _observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processGetOccupants(<any>response_);
          } catch (e) {
            return <Observable<JobOccupants>>(<any>_observableThrow(e));
          }
        } else
          return <Observable<JobOccupants>>(<any>_observableThrow(response_));
      })
    );
}

protected processGetOccupants(response: HttpResponseBase): Observable<JobOccupants> {
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
        result200 = JobOccupants.fromJS(resultData200);
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
  return _observableOf<JobOccupants>(<any>null);
}

getJobsFilteredByStatus(
  status: string = 'active',
  pageNumber: number,
  pageSize: number,
  filter: string = '',
  orderBy:string="jobtitle asc"): Observable<JobsListVm> {
  let httpParams = new HttpParams();
  httpParams = httpParams.append('pageNumber', pageNumber.toString())
  httpParams = httpParams.append('pageSize', pageSize.toString())

  if(status){
    httpParams = httpParams.append('status', status)
  }

  if(filter){
    httpParams = httpParams.append('filter', filter)
  }

  if(orderBy){
    httpParams = httpParams.append('orderBy',orderBy);
  }

  let url_ = this.baseUrl + '/api/jobs/filtered';
  url_ = url_.replace(/[?&]$/, '');

  let options_: any = {
    observe: 'response',
    responseType: 'blob',
    params: httpParams,
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };

  return this.http
    .request('get', url_, options_)
    .pipe(
      _observableMergeMap((response_: any) => {
        return this.processGetJobsFilteredByStatus(response_);
      })
    )
    .pipe(
      _observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processGetJobsFilteredByStatus(<any>response_);
          } catch (e) {
            return <Observable<JobsListVm>>(<any>_observableThrow(e));
          }
        } else
          return <Observable<JobsListVm>>(<any>_observableThrow(response_));
      })
    );
}

protected processGetJobsFilteredByStatus(response: HttpResponseBase): Observable<JobsListVm> {
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
        result200 = JobsListVm.fromJS(resultData200);
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
  return _observableOf<JobsListVm>(<any>null);
}
}