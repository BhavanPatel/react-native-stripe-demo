import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from './stripe_component/components/Button'
import testID from './stripe_component/utils/testID'

stripe.init({
  publishableKey: 'pk_test_bRwMbhpXDzOb2DATdYR25WS5',
  merchantId: '<MERCHANT_ID>',
})

export default class StripeHome extends Component {
  state = {
    loading: false,
    token: null,
  }

  handleCardPayPress = async () => {
    try {
      this.setState({
        loading: true,
        token: null,
      })
      const token = await stripe.paymentRequestWithCardForm({
        smsAutofillDisabled: true, // iOS only
      })

      console.log('Result:', token) // eslint-disable-line no-console
      this.setState({
        loading: false,
        token,
      })
      if(this.state.token.tokenId){
        alert('Success'); 
      }
      // alert(JSON.stringify(this.state.token));
    } catch (error) {
      console.log('Error:', error) // eslint-disable-line no-console
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Stripe Example
        </Text>
        <Button
          text="Purchase Order"
          loading={loading}
          onPress={this.handleCardPayPress}
          {...testID('cardFormButton')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
