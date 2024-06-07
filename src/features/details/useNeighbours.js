import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadNeighboursByBorder, selectNeighbours } from '../details/details-slice';

export const useNeighbours = (borders = []) => {
  const dispatch = useDispatch();
  const neighbours = useSelector(selectNeighbours);

  useEffect(() => {
    if (borders?.length) {
      dispatch(loadNeighboursByBorder(borders))
    }
  }, [borders, dispatch])

  return neighbours;
}