import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import avisos from './avisos';
import perfil from './perfil';
import reclamacoes from './reclamacoes';
import rotas from './rotas';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Rotas" component={rotas} />
      <Tab.Screen name="Perfil" component={perfil} />
      <Tab.Screen name="Reclamações" component={reclamacoes} />
      <Tab.Screen name="Avisos" component={avisos} />
    </Tab.Navigator>
  );
}
