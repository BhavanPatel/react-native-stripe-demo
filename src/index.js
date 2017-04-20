import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import stripe from 'tipsi-stripe'

stripe.init({publishableKey: '<PUBLISHABLE_KEY>', merchantId: '<MERCHANT_ID>'})

export default class StripeHome extends Component {
    state = {
        token: null
    }

    handleCardPayPress = async() => {
        try {

            const token = await stripe.paymentRequestWithCardForm({
                smsAutofillDisabled: true, // iOS only
            })

            console.log('Result:', token) // eslint-disable-line no-console
            this.setState({token})
            if (this.state.token.tokenId) {
                alert('Success');
            }
            //alert(JSON.stringify(this.state.token));
        } catch (error) {
            console.log('Error:', error) // eslint-disable-line no-console
            this.setState({loading: false})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Stripe Example
                </Text>
                <TouchableHighlight onPress={this.handleCardPayPress}>
                    <Text>Purchase Order</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
})
