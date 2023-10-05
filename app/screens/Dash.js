import {View, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import Layout from '../components/Layout'
import Logo from '../components/Logo'
import { colors } from '../config/colors'

const buttons = [
    {link: 'AdminProducts', img: require('../assets/add.png')},
    {link: 'AdminOrders', img: require('../assets/order.png')},
]

export default function Dash({ navigation }) {

    const renderItem = ({item}) => (
        <View style={{ margin: 10 }}>
            <TouchableOpacity onPress={()=>navigation.navigate(item.link)}>
                <Image source={item.img} style={styles.img} />
            </TouchableOpacity>
        </View>
    )
  return (
    <Layout>
        <View style={{ flex: 1 }}>
            <View style={styles.logo}>
                <Logo />
            </View>
            <FlatList data={buttons} renderItem={renderItem} keyExtractor={item=>item.link} />
        </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    logo: {
        backgroundColor: colors.orange,
        alignItems: 'center',
        padding: 10
    }
})