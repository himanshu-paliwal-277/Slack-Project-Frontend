import combineContext from '@/utils/combineContext';

import AuthContext from './AuthContext';

export const AppContextProvider = combineContext(AuthContext);
