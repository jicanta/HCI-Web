import { defineStore } from 'pinia'
import visaLogo from '@/assets/visa-logo.png';
import mastercardLogo from '@/assets/mastercard-logo.png';
import amexLogo from '@/assets/amex-logo.png';

export const usePaymentMethodsStore = defineStore('paymentMethods', {
  state: () => ({
    paymentMethods: [
      { id: 1, type: 'Visa', number: '4444444444444', color: 'black darken-3' },
      { id: 2, type: 'Mastercard', number: '555566666666666', color: 'blue darken-1' },
      { id: 3, type: 'American Express', number: '3444444444444444', color: 'orange darken-3' },
    ]
  }),
  actions: {
    addPaymentMethod(paymentMethod) {
      const newId = this.paymentMethods.length > 0 
        ? Math.max(...this.paymentMethods.map(pm => pm.id)) + 1 
        : 1
      this.paymentMethods.push({ ...paymentMethod, id: newId })
    },
    removePaymentMethod(id) {
      const index = this.paymentMethods.findIndex(method => method.id === id)
      if (index !== -1) {
        this.paymentMethods.splice(index, 1)
      }
    },
    cardLogo(type){
      switch (type) {
          case 'Visa':
            return visaLogo;
          case 'Mastercard':
            return mastercardLogo;
          case 'American Express':
            return amexLogo;
          default:
            return null;
        }
    }

  }
})