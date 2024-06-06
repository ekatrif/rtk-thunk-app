import { useSelector, useDispatch } from 'react-redux';
import { setRegion, selectRegion } from './controls-slice';

export const useRegion = () => {
  const dispatch = useDispatch();
  const region = useSelector(selectRegion);

  const handleSelect = (reg) => {
    dispatch(setRegion(reg?.value || ''))
  }

  return [region, handleSelect];
}