import { MaterialIcons } from "@expo/vector-icons";
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
      <Tab.Screen name="Perfil" component={perfil} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}/>
      <Tab.Screen name="Rotas" component={rotas} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="directions-bus" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Reclamações" component={reclamacoes} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat-bubble" size={size} color={color} />
          ),
        }}/>
      <Tab.Screen name="Avisos" component={avisos} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="warning" size={size} color={color} />
          ),
        }}/>
    </Tab.Navigator>
  );
}
