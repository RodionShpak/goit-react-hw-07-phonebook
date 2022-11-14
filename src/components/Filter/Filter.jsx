import React, { useEffect, useCallback } from 'react';
import { Box } from 'components/Common/Box.styled';
import { Button, Label, InputField } from 'components/Filter/Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';

export const FilterForm = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const clearSearchFilter = useCallback(() => {
    dispatch(searchFilter(''));
  }, [dispatch]);

  const onKeyPress = useCallback(
    e => {
      if (e.code === 'Escape') {
        clearSearchFilter();
      }
    },
    [clearSearchFilter]
  );

  useEffect(() => {
    document.getElementById('contactFIlter').addEventListener('keydown', onKeyPress);
  }, [onKeyPress]);

  return (
    <Box display="flex" flexDirection="column" my="10px" p="0" border="1px solid #888888" borderRadius="2px">
      <Label htmlFor="contactFIlter">
        Фільтр
        {filter.search.length > 0 && (
          <Button type="button" onClick={clearSearchFilter}>
            ❌
          </Button>
        )}
      </Label>
      <InputField id="contactFIlter" onChange={e => dispatch(searchFilter(e.currentTarget.value))} type="text" name="filter" value={filter.search} />
    </Box>
  );
};