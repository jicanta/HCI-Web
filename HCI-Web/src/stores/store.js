import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User, CreditCard, Payment} from './classes';
import { initializeApp as initAppFunction } from './initializeApp';
import visaLogo from '@/assets/visa-logo.png';
import mastercardLogo from '@/assets/mastercard-logo.png';
import amexLogo from '@/assets/amex-logo.png';


 export const useAppStore = defineStore("app", () => {

    const users = ref([]);
    const currentUser = ref(-1);
    const lastId = ref(0);
    const isInitialized = ref(false);

    const spendingCategories = ref(["Comida", "Transporte", "Compras", "Salud", "Servicios"]);
    const earningCategories = ref(["Cobro", "Venta de producto", "Ingreso desde otra cuenta"]);

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

 
    function addPayment(ammount, date, alias, cvu, isUsingCreditCard, category) {
        if (currentUser.value >= 0){
            const user = users.value[currentUser.value];
            let name = "";
            let userToPay = null;
            if( ( alias !== null || cvu !== null ) && (user.balance >= -ammount || isUsingCreditCard ) ) {
                if(alias !== null){
                    userToPay = getUserByAlias(alias);
                    name = userToPay ? userToPay.name + " " + userToPay.surname : "Desconocido"; 
                }// en el caso de que getUserByAlias / getUserByCVU de null significa que no se encuentra dentro de la base de datos -> "Desconocido"
                else{
                    userToPay = getUserByCVU(cvu);
                    name = userToPay ? userToPay.name + " " + userToPay.surname : "Desconocido";
                }
                user.payments.push(new Payment(ammount, date, name, category));
                if(!isUsingCreditCard){
                    user.balance += Number(ammount);
                }
                return true;
           }
            return false;
        }
    }

    function addDeposit(ammount, date, category) {
        if (currentUser.value >= 0){
            const user = users.value[currentUser.value];
            user.balance += Number(ammount);
            user.payments.push(new Payment(formatCurrency(ammount), date, "Tarjeta", category));
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

    function getInvested() {
        if (currentUser.value >= 0){
            return users.value[currentUser.value].invested;
        }
    }

    function addInvested(amount) {
        if (currentUser.value >= 0 && amount != null ){
            console.log("Balance:");
            console.log(users.value[currentUser.value].balance);
            console.log("Invested:");
            console.log(users.value[currentUser.value].invested);
            
            users.value[currentUser.value].balance -= Number(amount);
            users.value[currentUser.value].invested += Number(amount);
            
            console.log("Balance:");
            console.log(users.value[currentUser.value].balance);
            console.log("Invested:");
            console.log(users.value[currentUser.value].invested);
        }
    }

    function getPayments() {
        if (currentUser.value >= 0){
            return users.value[currentUser.value].payments;
        }
        return [];
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
                return 1;
            }

            return 0;
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
            addPayment,
            getPayments,
            users,
            getAliasById,
            getSpendingCategories,
            getEarningCategories
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

    function getUserByAlias(alias){
        for(let i = 0; i < users.value.length; i++){
            if(users.value[i].alias === alias){
                return users.value[i];
            }
        }
        return null;
    }

    function getUserByCVU(cvu){
        for(let i = 0; i < users.value.length; i++){
            if(users.value[i].cvu === cvu){
                return users.value[i];
            }
        }
        return null;
    }

    function getAliasById(id){
        return users.value[id].alias;
    }

    function getSpendingCategories(){
        return spendingCategories.value;
    }

    function getEarningCategories(){
        return earningCategories.value;
    }

    return { 
        users, 
        currentUser, 
        lastId, 
        addUser, 
        addCreditCard, 
        setCurrentUser, 
        addPayment, 
        getBalance, 
        getPayments, 
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
        getNameByAliasOrCVU,
        getInvested,
        addInvested,
        addDeposit,
        getUserByAlias,
        getUserByCVU,
        getAliasById,
        getSpendingCategories,
        getEarningCategories
    };
 });
