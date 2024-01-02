import { FlatList, View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { useCreateOrderMutation } from "../store/apiSlice";
import CartListItem from "../components/CartListItem";
import { useDispatch, useSelector } from "react-redux";
import { selectDeliveryPrice, selectSubtotal, selectTotal, cartSlice } from "../store/cartSlice";
const ShoppingCartTotal = () =>{
  const subtotal = useSelector(selectSubtotal)
  const deliveryFee = useSelector(selectDeliveryPrice)
  const total = useSelector(selectTotal)
  return(
    <View style = {styles.totalsContainer}>
    <View style = {styles.row}>
        <Text style ={styles.text}>Subtotal</Text>
        <Text style ={styles.text}>{subtotal} $</Text>
    </View>
    <View style = {styles.row}>
        <Text style ={styles.text}>Delivery</Text>
        <Text style ={styles.text}>{deliveryFee} $</Text>
    </View>
    <View style = {styles.row}>
        <Text style ={styles.textBold}>Total</Text>
        <Text style ={styles.textBold}>{total} $</Text>
    </View>
</View>
)
}

const ShoppingCart = () =>{
  const subtotal = useSelector(selectSubtotal)
  const deliveryFee = useSelector(selectDeliveryPrice)
  const total = useSelector(selectTotal)
  const dispatch = useDispatch();
  const [createOrder, {data, isLoading, error}] = useCreateOrderMutation();
  const onCreateOrder =  async () =>
  {
   const result = await createOrder({
      items: cartItem,
      subtotal,
      deliveryFee,
      customer:{
        name: "MinhTris",
        address: "Ho Chi Minh",
        email:"minhtris@gmail.com"
      }
    })
    if (result.data?.status == 'Ok')
  {
    Alert.alert(
      'Order has been submited',
      `Your payment code is: ${result.data.data.ref}`
    )
    dispatch(cartSlice.actions.clear());
  }
  }
  const cartItem = useSelector((state) => state.cart.items)
    return(
        <>
        <FlatList
        data = {cartItem} 
        renderItem = {({item}) => <CartListItem cartItem ={item}  />}
        ListFooterComponent ={ShoppingCartTotal}
        />
        <Pressable onPress ={onCreateOrder}
        style ={styles.button}>
        <Text style = {styles.buttonText}>Check Out</Text>
      </Pressable>
      </>
    )
}

const styles = StyleSheet.create({
    totalsContainer: {
      margin: 20,
      paddingTop: 10,
      borderColor: 'gainsboro',
      borderTopWidth: 1,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 2,
    },
    text: {
      fontSize: 16,
      color: 'gray',
    },
    textBold: {
      fontSize: 16,
      fontWeight: '500',
    },
  
    button: {
      position: 'absolute',
      backgroundColor: 'black',
      bottom: 30,
      width: '90%',
      alignSelf: 'center',
      padding: 20,
      borderRadius: 100,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: '500',
      fontSize: 16,
    },
  });
export default ShoppingCart;