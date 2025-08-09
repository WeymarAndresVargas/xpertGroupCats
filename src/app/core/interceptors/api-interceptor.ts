import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = ( req, next ) => {
  let headers: any;
  console.log('interceptor');
  const apiKey = environment.apiKey;
  headers = {
    'x-api-key': `${ apiKey }`, 'Content-Type': 'application/json',
  };
  req = req.clone( {
    setHeaders: headers,
  } );
  return next( req );
};
