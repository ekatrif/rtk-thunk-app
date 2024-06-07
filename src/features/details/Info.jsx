import styled from 'styled-components';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectNeighbors, loadNeighborsByBorder } from './details-slice';

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

export const Info = (props) => {
  const {
    name,
    flags,
    capital,
    population,
    region,
    subregion,
    tld = [],
    borders = [],
    push,
    currencies = {},
    languages = {},
  } = props;

  const dispatch = useDispatch();
  const neighbors = useSelector(selectNeighbors);

  useEffect(() => {
    if (borders?.length) {
      dispatch(loadNeighborsByBorder(borders))
    }
  }, [borders, dispatch])

  const nativeNameArr = name.nativeName;
  const nativeKey = Object.keys(nativeNameArr)[0];
  const nativeName = name.nativeName[nativeKey].official;

  return (
    <Wrapper>
      <InfoImage src={flags.png} alt={flags.alt} />

      <div>
        <InfoTitle>{name.common}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Name:</b> {nativeName}
            </ListItem>
            <ListItem>
              <b>Population</b> {population}
            </ListItem>
            <ListItem>
              <b>Region:</b> {region}
            </ListItem>
            <ListItem>
              <b>Sub Region:</b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital[0]}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domain</b>{' '}
              {tld?.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Currency</b>{' '}
              {Object.keys(currencies)?.map((key) => (
                <span key={key}>{currencies[key].name} </span>
              ))}
            </ListItem>
            <ListItem>
              <b>Top Level Domain</b>{' '}
              {Object.keys(languages)?.map((key) => (
                <span key={key}>{languages[key]}</span>
              ))}
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries</b>
          {!borders.length ? (
            <span>There is no border countries</span>
          ) : (
            <TagGroup>
              {neighbors.map((b) => (
                <Tag key={b} onClick={() => push(`/country/${b}`)}>
                  {b}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};
