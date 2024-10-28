import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User, CreditCard, Payment } from './classes';
import { initializeApp as initAppFunction } from './initializeApp';
import visaLogo from '@/assets/visa-logo.png';
import mastercardLogo from '@/assets/mastercard-logo.png';
import amexLogo from '@/assets/amex-logo.png';


 export const useAppStore = defineStore("app", () => {

    const users = ref([]);
    const currentUser = ref(0);
    const lastId = ref(0);
    const isInitialized = ref(false);

    function addUser(email, password, name, surname, dni, telephone) {
        if(!existsDNI(dni)){
            users.value.push(new User(lastId.value, email, password, name, surname, dni, telephone));
            lastId.value++;
            return 1;
        }
        return 0;
    }

    function existsDNI(dni) {  //es una funcion auxiliar, no se va a exportar
        for(let i = 0 ; i < users.value.length ; i++) {
            if(users.value[i].dni == dni) {
                return true;
            }
        }
        return false;
    }

    function existsCVU(cvu) {  //es una funcion auxiliar, no se va a exportar
        for(let i = 0 ; i < users.value.length ; i++) {
            if(users.value[i].cvu == cvu) {
                return true;
            }
        }
        return false;
    }

    function existsAlias(alias) {  //es una funcion auxiliar, no se va a exportar
        for(let i = 0 ; i < users.value.length ; i++) {
            if(users.value[i].alias == alias) {
                return true;
            }
        }
        return false;
    }

    function addCreditCard(number, name, cvv) {
        if (currentUser.value >= 0){
            const type = getCardType(number);
            users.value[currentUser.value].creditCards.push(new CreditCard(number, name, cvv, type, getCardColor(type)));
        }
    }

    function setCurrentUser(id) {
        currentUser.value = id;
    }

    function addContact(user) {
        if (currentUser.value >= 0){
            users.value[currentUser.value].contacts.push(user);
        }
    }
 
    function addPayment(ammount, date, name, alias, cvu, isUsingCreditCard) {    //dni es el dni hacia quien le mando la plata, el tema es que 
        if (currentUser.value >= 0){
            const user = users.value[currentUser.value];

            if( ( alias === null || existsAlias(alias) ) && (user.balance >= ammount || isUsingCreditCard ) && ( cvu === null || existsCVU(cvu) ) ) {
                user.payments.push(new Payment(formatCurrency(ammount), date, name));
                user.balance += ammount;
                return true;
           }
            return false; //significa que no se pudo realizar el pago
        }
    }

    function getBalance() {
        if (currentUser.value >= 0){
            return users.value[currentUser.value].balance;
        }
    }

    function addBalance(amount) {
        if (currentUser.value >= 0 && amount != null ){
            users.value[currentUser.value].balance += Number(amount);
        }
    }

    function getPayments() {
        if (currentUser.value >= 0){
            return users.value[currentUser.value].payments;
        }
        return [];
    }

    function getContacts() {
        if (currentUser.value >= 0){
            return users.value[currentUser.value].contacts;
        }
    }

    function getCreditCards() {
        if (currentUser.value >= 0){
            return users.value[currentUser.value].creditCards;
        }
        return [];
    }

    function getCurrentUser() {
        if(currentUser.value == -1) {
            return null;
        }
        return users.value[currentUser.value];
    }

    function getId() {
        if(currentUser.value == -1) {
            return -1;
        }
        return users.value[currentUser.value].id;
    }

    function getDni() {
        if(currentUser.value == -1) {
            return -1;
        }
        return users.value[currentUser.value].dni;
    }

    function getCvu() {
        if(currentUser.value == -1) {
            return -1;
        }
        return users.value[currentUser.value].cvu;
    }

    function getAlias() {
        if(currentUser.value == -1) {
            return -1;
        }
        return users.value[currentUser.value].alias;
    }
    
    function getCardColor(type){
        switch(type){
            case 'Visa': return 'black darken-3';
            case 'Mastercard': return 'blue darken-1';
            case 'American Express': return 'orange-darken-3';
            default: return 'grey darken-3';
        }
    }

    function getUserByEmail(email){
        return users.value.find(obj => obj.email === email);
    }

    function authUser(email, password){
        var user = getUserByEmail(email);

        if (user != undefined){

            console.log("Log in info:");
            console.log(email);
            console.log(user.id);

            if (user.password === password){
                setCurrentUser(user.id);
                console.log("Signed in as id:");
                console.log(getId());
            }

            return 1;
        }

        return 0;
    }

    function getCardType(number){
        if(number.startsWith("4")) return "Visa";
        if(number.startsWith("34") || number.startsWith("37")) return "American Express";
        if(number.startsWith("5")) return "Mastercard";
        return "Unknown";
    }

    function getCardLogo(type){
        switch(type){
            case 'Visa': return visaLogo;
            case 'Mastercard': return mastercardLogo;
            case 'American Express': return amexLogo;
            default: return null;
        }
    }

    function getNameByAliasOrCVU(alias, cvu){
        if(alias === null && cvu === null){
            return null;
        }
        for(let i = 0; i < users.value.length; i++){
            if( (users.value[i].alias === alias || alias === null) && (users.value[i].cvu === cvu || cvu === null) ){
                return users.value[i].name + " " + users.value[i].surname;
            }
        }
        return null;
    }

    function initialize() {
        initAppFunction({
            addUser,
            setCurrentUser,
            addCreditCard,
            addContact,
            addPayment,
            getPayments,
            users
        });
    }

    function initializeApp() {
        if (users.value.length === 0) {
            initialize();
        }
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

    function log() {
        currentUser.value = -1;
    }

    function removeCard(number) {
        users.value[currentUser.value].creditCards = users.value[currentUser.value].creditCards.filter(card => card.number !== number);
    }

    function checkUserExists(email, password){
        for(let i = 0; i < users.value.length; i++){
            if(users.value[i].email == email && users.value[i].password == password){
                return true;
            }
        }
        return false;
    }

    function formatTransactionDate(date) {
        if (!(date instanceof Date)) {
          date = new Date(date);
        }
        
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit', 
          minute: '2-digit'
        };
        
        return date.toLocaleDateString('es-AR', options);
      };

    function formatCurrency(amount) {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: 'exceptZero'
      }).format(amount);
    };

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
        authUser,
        initializeApp,
        updateUserAlias,
        updateUserName,
        updateUserSurname,
        updateUserEmail,
        updateUserTelephone,
        existsAlias,
        existsCVU,
        log,
        formatTransactionDate,
        getId,
        getDni,
        getCvu,
        getAlias,
        removeCard,
        addBalance,
        getCardLogo,
        checkUserExists,
        formatCurrency,
        getNameByAliasOrCVU
    };
 });
