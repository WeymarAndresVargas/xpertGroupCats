import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './core/interceptors/api-interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { definePreset } from '@primeuix/themes';
const MyConfig = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{sky.50}',
      100: '{sky.100}',
      200: '{sky.200}',
      300: '{sky.300}',
      400: '{sky.400}',
      500: '{sky.500}',
      600: '{sky.600}',
      700: '{sky.700}',
      800: '{sky.800}',
      900: '{sky.900}',
      950: '{sky.950}'
    }
  }
});
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient( withInterceptors( [ apiInterceptor ] ) ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection( { eventCoalescing: true } ),
    provideRouter( routes ),
    providePrimeNG( {
      theme: {
        preset: MyConfig,

      }
    } ),
    provideAnimationsAsync()
  ]
};

