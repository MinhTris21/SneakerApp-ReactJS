import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import products from '../data/products';
import { productsSlice } from '../store/productsSlice';
const ProductsScreen = ({navigation}) =>{
  const  dispatch = useDispatch();
  const products = useSelector((state) => state.products.products)

    return(
      <FlatList
        data={products}
        renderItem ={({ item }) => (
      <Pressable onPress = {() => 
        {dispatch(productsSlice.actions.setSelectedProduct(item.id))
        navigation.navigate('Product Details')} }
      style = {styles.itemcontainer}>
      <Image source={{uri: item.image,}} style ={styles.image}/>
      </Pressable>
      )}
      numColumns = {2}
    />
    )
}
const styles = StyleSheet.create({
    itemcontainer:{
      width: "50%",
      padding: 1,
    },
    image: {
      width: "100%", 
      aspectRatio: 1,
    }
  });

  export default ProductsScreen;