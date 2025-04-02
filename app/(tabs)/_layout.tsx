import { Tabs } from "expo-router";
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';


export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name='Jobs' options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) =>
          <Feather name='search' size={size} color={color} />
      }} />
      <Tabs.Screen name='Bookmarks' options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) =>
          <FontAwesome name='bookmark' size={size} color={color} />
      }} />

    </Tabs>
  )
}