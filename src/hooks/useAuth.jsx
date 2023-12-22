//* LIB
import { userAuthContext } from '@/contexts/UserAuthContext';
import React from 'react';

//* IMPORT

const useAuth = () => React.useContext(userAuthContext);

export default useAuth;
