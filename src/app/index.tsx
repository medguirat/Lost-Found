import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ItemCard from '@/components/ItemCard';
import { Item } from '@/types';
const STARTER_ITEMS: Item[] = [
{ id: '1', title: 'Blue water bottle', place: 'Library, 2nd floor' },
{ id: '2', title: 'Student card', place: 'Cafeteria' },
{ id: '3', title: 'USB-C charger', place: 'Room B12' },
];
export default function Index() {
const [items, setItems] = useState<Item[]>(STARTER_ITEMS);
const [title, setTitle] = useState('');
const [place, setPlace] = useState('');
const canAdd = title.trim() !== '' && place.trim() !== '';
function addItem() {
if (!canAdd) return;
const newItem: Item = {
id: Date.now().toString(),
title: title.trim(),
place: place.trim(),
};
setItems([newItem, ...items]);
setTitle('');
setPlace('');
}
return (
<View style={styles.screen}>
<Text style={styles.count}>{items.length} items reported</Text>
<View style={styles.form}>
<TextInput
style={styles.input}
placeholder="What did you find?"
value={title}
onChangeText={setTitle}
/>
<TextInput
style={styles.input}
placeholder="Where?"
value={place}
onChangeText={setPlace}
/>
<Pressable
style={[styles.button, !canAdd && styles.buttonDisabled]}
onPress={addItem}
disabled={!canAdd}
>
<Text style={styles.buttonText}>Add item</Text>
</Pressable>
</View>
<FlatList
data={items}
keyExtractor={(item) => item.id}
renderItem={({ item }) => <ItemCard title={item.title} place={item.place} />}
ItemSeparatorComponent={Separator}
ListEmptyComponent={<Text>Nothing reported yet.</Text>}
/>
</View>
);
}
function Separator() {
return <View style={styles.separator} />;
}
const styles = StyleSheet.create({
screen: {
flex: 1,
padding: 16,
backgroundColor: '#24272f',
},
count: {
color: '#3c71db',
marginBottom: 12,
},
form: {
gap: 8,
marginBottom: 16,
},
input: {
backgroundColor: '#726262',
borderWidth: 1,
borderColor: '#5f6775',
borderRadius: 8,
padding: 12,
fontSize: 16,
},
button: {
backgroundColor: '#2563eb',
borderRadius: 8,
padding: 12,
alignItems: 'center',
},
buttonDisabled: {
opacity: 0.4,
},
buttonText: {
color: '#672b2b',
fontWeight: '600',
fontSize: 18,
},
separator: {
height: 15,
},
});