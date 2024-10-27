import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User, CreditCard, Payment } from './classes';
import { initializeApp } from './initializeApp';


 export const useAppStore = defineStore("app", () => {

    const users = ref([]);
    const currentUser = ref(-1);
    const lastId = ref(0);

    function addUser(email, username, password, name, surname, dni, telephone) {
        if(!exists(dni)){
            users.value.push(new User(lastId.value, email, username, password, name, surname, dni, telephone));
            lastId.value++;
            return;
        }
        return error("DNI already exists");
    }

    function exists(dni) {  //es una funcion auxiliar, no se va a exportar
        for(let i = 0 ; i < users.value.length ; i++) {
            if(users.value[i].dni == dni) {
                return true;
            }
        }
        return false;
    }

    function addCreditCard(number, name, cvv) {
        const type = getCardType(number);
        users.value[currentUser.value].creditCards.push(new CreditCard(number, name, cvv, type, getCardColor(type)));
    }

    function setCurrentUser(id) {
        currentUser.value = id;
    }

    function addContact(user) {
        users.value[currentUser.value].contacts.push(user);
    }

    function addPayment(amount, date, contact, isUsingCreditCard) {
        const user = users.value[currentUser.value];
        if(exists(user.dni) && (user.balance >= amount || isUsingCreditCard ) ) {
            user.payments.push(new Payment(amount, date, contact));
            user.balance -= amount;
            return true;
        }
        return false; //significa que no se pudo realizar el pago
    }

    function getBalance() {
        return users.value[currentUser.value].balance;
    }

    function getPayments() {
        return users.value[currentUser.value].payments;
    }

    function getContacts() {
        return users.value[currentUser.value].contacts;
    }

    function getCreditCards() {
        return users.value[currentUser.value].creditCards;
    }

    function getCurrentUser() {
        return users.value[currentUser.value];
    }

    function getCardColor(type){
        switch(type){
            case 'Visa': return 'black darken-3';
            case 'Mastercard': return 'blue darken-1';
            case 'American Express': return 'orange-darken-3';
            default: return 'grey darken-3';
        }
    }

    function getCardType(number){
        if(number.startsWith("4")) return "Visa";
        if(number.startsWith("34") || number.startsWith("37")) return "American Express";
        if(number.startsWith("5")) return "Mastercard";
        return "Unknown";
    }

    function initialize() {
        initializeApp({
            addUser,
            setCurrentUser,
            addCreditCard,
            addContact,
            addPayment
        });
    }

    function updateUserAlias(newValue) {
        users.value[currentUser.value].alias = newValue;
    }

    function updateUserName(newValue) {
        users.value[currentUser.value].name = newValue;
    }

    function updateUserSurname(newValue) {
        users.value[currentUser.value].surname = newValue;
    }   

    function updateUserEmail(newValue) {
        users.value[currentUser.value].email = newValue;
    }

    function updateUserTelephone(newValue) {
        users.value[currentUser.value].telephone = newValue;
    }

    function updateUserUsername(newValue) {
        users.value[currentUser.value].username = newValue;
    }

    function log() {
        currentUser.value = -1;
    }


    return { 
        users, 
        currentUser, 
        lastId, 
        addUser, 
        addCreditCard, 
        setCurrentUser, 
        addContact, 
        addPayment, 
        getBalance, 
        getPayments, 
        getContacts, 
        getCreditCards, 
        getCurrentUser, 
        getCardColor, 
        getCardType,
        initialize,
        updateUserAlias,
        updateUserName,
        updateUserSurname,
        updateUserEmail,
        updateUserTelephone,
        updateUserUsername
    };
 });
