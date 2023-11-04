import React, { useState } from 'react';
// components
import { ScrollView, Text, View } from 'react-native';
import ModalComponent from '@/components/molecules/Modal/ModalComponent';
import SearchSupplies from '@/components/molecules/SearchSupplies/SearchSupplies';
import MenuItem from '@/components/atoms/MenuItem/MenuItem';
import FloatingButton from '@/components/atoms/FloatingButton/FloatingButton';
// hooks
import useTheme from '@/theme/useTheme';
import { useNavigation } from '@react-navigation/native';
// types
import { Supply } from '@/services/schemas/supplies';
import { ApplicationPrivateStackParamList } from 'types/navigation';
import { NavigationProp } from '@react-navigation/core/src/types';

type Props = {
  isVisible: boolean;
  close: () => unknown;
};

const SearchSupplyModal = ({ isVisible, close }: Props) => {
  const { layout, gutters, fonts } = useTheme();
  const navigation =
    useNavigation<NavigationProp<ApplicationPrivateStackParamList>>();
  const [supplies, setSupplies] = useState<Supply[]>([]);

  const handleFilteredSupplies = (newSupplies: Supply[] | undefined) => {
    if (newSupplies) {
      setSupplies(newSupplies);
    }
  };

  const handleSupplySelected = (spotId: string) => {
    close();
    navigation.navigate('SpotDetails', { id: spotId });
  };

  return (
    <ModalComponent isVisible={isVisible} close={close} direction="top" fill>
      <View style={[layout.fullHeight]}>
        <SearchSupplies setValue={handleFilteredSupplies} />
        <ScrollView style={[gutters.marginTop_16]}>
          <View style={[gutters.marginBottom_40, { marginBottom: 110 }]}>
            {supplies?.map(({ id, name, marque, spotId }) => (
              <View key={`spot-${id}`} style={[gutters.marginVertical_8]}>
                <MenuItem
                  title={name}
                  subtitle={marque}
                  onPress={() => handleSupplySelected(spotId)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <FloatingButton onPress={close}>
          <Text
            style={[fonts.nationalRegular, fonts.font_32, fonts.text_gray500]}
          >
            🚪
          </Text>
        </FloatingButton>
      </View>
    </ModalComponent>
  );
};

export default SearchSupplyModal;
