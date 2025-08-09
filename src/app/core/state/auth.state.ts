import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { IUser } from '../../intefaces/user';


export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null, isAuthenticated: false, loading: false, error: null
};

export const AuthStore = signalStore( { providedIn: 'root' },
  withState( initialState ),
  withMethods( ( store ) => (  {
    /**
     * Inicia sesión con el email y contraseña proporcionados
     */
    login: ( user: IUser ) => {
      patchState( store, {
        user, isAuthenticated: true, loading: false, error: null
      } );
      localStorage.setItem('user', JSON.stringify(user));
    },

    /**
     * Cierra la sesión del usuario actual
     */
    logout: () => {
      localStorage.removeItem( 'user' );
      patchState( store, {
        user: null, isAuthenticated: false, error: null
      } );
    },

    /**
     * Intenta restaurar la sesión desde localStorage al iniciar la aplicación
     */
    checkAuth: () => {
      const userStr = localStorage.getItem( 'user' );
      if( userStr ) {
        try {
          const user = JSON.parse( userStr ) as IUser;
          patchState( store, {
            user, isAuthenticated: true
          } );
        } catch ( e ) {
          localStorage.removeItem( 'user' );
        }
      }
    }
  }
) ), withHooks( {
  onInit( { checkAuth }: { checkAuth: () => void } ) {
    checkAuth();
  }
} ) );
