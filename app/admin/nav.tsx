import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import alunos from './alunos';
import avisos from './avisos';
import reclamacoes from './reclamacoes';
import rotas from './rotas';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Rotas" component={rotas} />
      <Tab.Screen name="Avisos" component={avisos} />
      <Tab.Screen name="Reclamacoes" component={reclamacoes} />
      <Tab.Screen name="Alunos" component={alunos} />
    </Tab.Navigator>
  );
}
