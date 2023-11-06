import React, { useEffect, useState } from 'react';
//Components
import Input from '@/components/atoms/Input/Input';
//Hooks
import useDebounce from '@/hooks/useDebounce';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
//Services & utils
import SuppliesService from '@/services/SuppliesService';
import keywordsUtils from '@/utils/keywordsUtils';
//Types
import { Supply } from '@/services/schemas/supplies';

type Props = {
  spotId?: string;
  setValue: (supplies: Supply[] | undefined) => unknown;
};

const SearchSupplies = ({ spotId, setValue }: Props) => {
  const { t } = useTranslation(['spotDetails']);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search);

  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const { data: searchSupplies, isSuccess } = useQuery(
    ['searchSupplies', debouncedSearch],
    () => {
      return SuppliesService.searchSupplies({
        spotId: spotId,
        keyword: debouncedSearch,
      });
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setValue(searchSupplies);
    }
  }, [isSuccess, searchSupplies, setValue]);

  useEffect(() => {
    if (debouncedSearch === '') {
      setValue(undefined);
    }
  }, [debouncedSearch, setValue]);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  return (
    <Input
      control={control}
      name="search"
      label={t('searchSupplies.label')}
      placeholder={t('searchSupplies.placeholder')}
      onChangeText={handleChange}
    />
  );
};

SearchSupplies.defaultProps = {
  spotId: undefined,
};

export default SearchSupplies;
