class User {
    constructor(id, email, username, password, name, surname, dni, telephone) {
        this.id = id;
        this.email = email;
        this.username = username;
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
    constructor(amount, date, user) {
        this.amount = amount;
        this.date = date;
        this.user = user;
    }
}

export { User, CreditCard, Payment};
