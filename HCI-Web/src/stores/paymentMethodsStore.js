import { defineStore } from 'pinia'
import visaLogo from '@/assets/visa-logo.png';
import mastercardLogo from '@/assets/mastercard-logo.png';
import amexLogo from '@/assets/amex-logo.png';

export const usePaymentMethodsStore = defineStore('paymentMethods', {
  state: () => ({
    paymentMethods: [
      { id: 1, name: 'Federico Magri', type: 'Visa', number: '4424378944004324', color: 'black darken-3' },
      { id: 2, name: 'Federico Magri', type: 'Mastercard', number: '5335006634516261', color: 'blue darken-1' },
      { id: 3, name: 'Federico Magri', type: 'American Express', number: '3459764334254342', color: 'orange-darken-3' },
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
      console.log("Removing...");
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