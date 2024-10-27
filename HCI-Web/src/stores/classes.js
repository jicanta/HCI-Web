const spendingCategories = ["Comida", "Transporte", "Compras"];
const earningCategories = ["Cobro", "Venta de producto"];

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
        this.contacts = [];
        this.alias = `carreta.${this.name.toLowerCase()}.${this.surname.toLowerCase()}.logo`;  //TODO: cambiar logo por nombre de la app
        this.cvu = Array(22).fill().map(() => Math.floor(Math.random() * 10)).join('');
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
    constructor(amount, date, name) {
        this.amount = amount;
        this.date = date;
        this.name = name;
        if (amount < 0){
            var categoryIndex = getRandomIntegerBetween(0, spendingCategories.length-1);
            this.category = spendingCategories[categoryIndex];
        }
        else {
            var categoryIndex = getRandomIntegerBetween(0, earningCategories.length-1);
            this.category = earningCategories[categoryIndex];
        }
    }
}

function getRandomIntegerBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

export { User, CreditCard, Payment};
