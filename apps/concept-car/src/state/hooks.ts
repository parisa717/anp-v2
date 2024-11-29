import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from './store'

/** documentation: https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks **/

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
