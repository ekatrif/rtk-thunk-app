import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectVisibleCountries, selectCountriesInfo } from './counties-slice';
import { loadCountries } from './counties-slice';
import { selectControls } from '../controls/controls-slice';

export const useCountries = () => {

  const dispatch = useDispatch();
  const controls = useSelector(selectControls);
  const countries = useSelector(state => selectVisibleCountries(state, controls));
  const {status, error, qty} = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error }];
}