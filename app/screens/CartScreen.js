import React, { useState, useEffect, useContext } from 'react'
import { 
    SafeAreaView, View, Text, TouchableOpacity, StatusBar, StyleSheet, Image, FlatList 
} from 'react-native'

import { colors } from '../config/colors'

import { Ionicons } from '@expo/vector-icons'
import TextList from '../components/TextList'
import Button from '../components/Button'
import Padder from '../components/Padder'

import Action from '../components/Action'
import { Context } from '../config/Provider'
import Toast from 'react-native-root-toast';

export default function CartScreen({ navigation }) {
    const state = useContext(Context)
    const [cart, setCart] = useState([])

    useEffect(()=>{
        navigation.setOptions({
            headerLeft: ()=>(
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{ marginRight: 20 }}>
                    <Ionicons name="arrow-undo-sharp" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    })

    useEffect(()=>{
        setCart(state.cart)
    }, [])

    const addPress = index => {
        const c = cart.map((item, i)=>{
            if(i === index){
                item['qty'] += 1 
            }
            return item
        })
        state.setCart(c)
    }
    const minusPress = index => {
        if(cart.length === 0) return
        const prodItem = state.cart[index]
        if(cart.length === 1 && prodItem['qty'] - 1 === 0){
            const c = cart.filter(item=>item.id !== prodItem.id)
            state.setCart(c)
            state.setCartQtyZero()
            Toast.show('Cart is empty', {duration: Toast.durations.LONG, position: Toast.positions.CENTER})
            navigation.goBack()
        }else{
            const c = cart.map((item, i)=>{
                if(i === index){
                    item['qty'] -= 1 
                }
                return item
            })
            state.setCart(c)
        }
    }

    const renderItem = ({item, index}) => (
        <View style={styles.productItem}>
            <View style={styles.product}>
                <View style={styles.productImg}>
                    <Image source={{ uri: item.img }} style={{ width: 80, height: 80 }} />
                </View>
                <View style={{ width: 140, marginLeft: 10 }}>
                    <Text numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail'>${item.price}</Text>
                </View>
            </View>
            <View style={styles.action}>
                <Action addPress={()=>addPress(index)} minusPress={()=>minusPress(index)} text={item.qty} />
            </View>
        </View>
    )

    const checkout = () => {
        if(state.cart.length === 0) return
        navigation.navigate('Checkout')
    }
  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>

            <View style={styles.cart}>
                <FlatList data={state.cart} renderItem={renderItem} keyExtractor={item=>item.name} />
            </View>

            <View style={styles.checkout}>
                <TextList label="Subtotal" text={`$${state.totalFee.toFixed(2)}`} fontSize={15} />
                <TextList label="Delivery" text={`$${state.deliveryFee}`} fontSize={15} />
                <TextList 
                label="Total" 
                text={`$${state.cart.length === 0 ? 0 : (state.totalFee+state.deliveryFee).toFixed(2)}`} 
                fontSize={15} fontWeight={800} lineColor="#fff" />
                <Padder />
                <Button onPress={checkout} btnName="CHECK OUT" fontSize={16} padding={15} />
            </View>

        </View>
        <StatusBar backgroundColor={colors.orange} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: colors.generalBg
    },
    action: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
        backgroundColor: colors.orange,
        padding: 10,
        borderRadius: 10
    },
    actionBtn: {
        flex: 1
    },
    cart: {
        flex: 5,
        padding: 10
    },
    checkout: {
        flex: 2,
        backgroundColor: '#fff',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    productItem: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    product: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    productImg: {
        width: 80, 
        height: 80,
        // backgroundColor: 'red'
    }
})