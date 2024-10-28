import { ref } from 'vue';

//const spendingCategories = ref(["Comida", "Transporte", "Compras", "Salud", "Servicios"]);
//const earningCategories = ref(["Cobro", "Venta de producto", "Ingreso desde otra cuenta"]);

class User {
    constructor(id, email, password, name, surname, dni, telephone) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.dni = dni;
        this.telephone = telephone;
        this.creditCards = [];
        this.payments = [];
        this.balance = 500000;
        this.alias = `carreta.${this.name.toLowerCase()}.${this.surname.toLowerCase()}.logo`;  //TODO: cambiar logo por nombre de la app
        this.cvu = Array(22).fill().map(() => Math.floor(Math.random() * 10)).join('');
        this.invested = 0;
    }
}

class CreditCard {
    constructor(number, name, cvv, type, color) {
        this.number = number;
        this.name = name;
        this.cvv = cvv;
        this.type = type;
        this.color = color;
    }
}

class Payment {
    constructor(amount, date, name, category) {
        this.amount = amount;
        this.date = date;
        this.name = name;
        this.category = category;
        /*if (amount < 0){
            var categoryIndex = getRandomIntegerBetween(0, spendingCategories.value.length-1);
            this.category = spendingCategories.value[categoryIndex];
        }
        else {
            var categoryIndex = getRandomIntegerBetween(0, earningCategories.value.length-1);
            this.category = earningCategories.value[categoryIndex];
        }*/
    }
}

function getRandomIntegerBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

export { User, CreditCard, Payment};
