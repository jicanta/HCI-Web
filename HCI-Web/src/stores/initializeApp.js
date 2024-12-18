import { User, CreditCard, Payment } from "./classes";
import { ref } from 'vue';


const users = ref([
    { email: "fmagri@gmail.com", password: "1", firstName: "Federico", lastName: "Magri", phoneNumber: "1145678901" , dni: "43567890", id: 0 },
    { email: "jcantarella@gmail.com", password: "123456", firstName: "Juan", lastName: "Cantarella", phoneNumber: "1123456789" , dni: "42345678", id: 1 },
    { email: "lbarrios@gmail.com", password: "123456", firstName: "Lucas", lastName: "Barrios", phoneNumber: "1187654321" , dni: "48765432", id: 2},
    { email: "ana.lopez@test.com", password: "clave4321", firstName: "Ana", lastName: "López", phoneNumber: "1156789012" , dni: "45678901", id: 3 },
    { email: "pedro.martinez@test.com", password: "segura5678", firstName: "Pedro", lastName: "Martínez", phoneNumber: "1178901234" , dni: "47890123", id: 4 },
    { email: "laura.sanchez@test.com", password: "laura2023", firstName: "Laura", lastName: "Sánchez", phoneNumber: "1190123456" , dni: "49012345", id: 5 },
    { email: "miguel.fernandez@test.com", password: "miFer1234", firstName: "Miguel", lastName: "Fernández", phoneNumber: "1112345678" , dni: "41234567", id: 6 },
    { email: "sofia.torres@test.com", password: "sofi9876", firstName: "Sofía", lastName: "Torres", phoneNumber: "1134567890" , dni: "43456789", id: 7 },
    { email: "javier.ruiz@test.com", password: "javi4567", firstName: "Javier", lastName: "Ruiz", phoneNumber: "1167890123" , dni: "46789012", id: 8 },
]);

function initializeApp(appStore) {
    users.value.forEach(user => {
        appStore.addUser(user.email, user.password, user.firstName, user.lastName, user.dni, user.phoneNumber);
    });
    generateAndAddCreditCards(appStore);
    generateAndAddContacts(appStore);
    appStore.setCurrentUser(-1); // Establecer el usuario actual al final de la inicialización

    console.log("Initialized.");
}

function generateAndAddCreditCards(appStore) {
    for(let i = 0; i < users.value.length; i++){
        for(let j = 0; j < 3; j++){
            appStore.setCurrentUser(i);
            appStore.addCreditCard(
                generarNumeroTarjeta(),
                users.value[i].firstName + " " + users.value[i].lastName,
                Math.floor(Math.random() * 1000).toString().padStart(3, '0')
            );
        }
    }
}

function generarNumeroTarjeta() {
    const prefijos = ['4', '5', '34', '37'];
    const prefijoElegido = prefijos[Math.floor(Math.random() * prefijos.length)];
    
    let numeroTarjeta = prefijoElegido;
    const longitudRestante = 16 - prefijoElegido.length;
    
    for (let i = 0; i < longitudRestante; i++) {
        numeroTarjeta += Math.floor(Math.random() * 10);
    }
    
    return numeroTarjeta;
}

function generateAndAddContacts(appStore) {
    for(let i = 0; i < users.value.length; i++){
        for(let j = 0; j < users.value.length; j++){
            if(i != j){
                appStore.setCurrentUser(i);

                const fechaPago1 = generarFechaAleatoria();
                const fechaPago2 = generarFechaAleatoria();

                const randomNumber1 = generateRandomNumber(1000,100000);
                const randomNumber2 = generateRandomNumber(1000,100000);

                appStore.addPayment(randomNumber1, fechaPago1, appStore.getAliasById(j), null, false, randomNumber1 < 0 ? generateRandomSpendingCategory(appStore) : generateRandomEarningCategory(appStore));
                appStore.addPayment(randomNumber2, fechaPago2, appStore.getAliasById(j), null, false, randomNumber2 < 0 ? generateRandomSpendingCategory(appStore) : generateRandomEarningCategory(appStore));
            }
        }
    }
}

var contFecha = 5;

function generarFechaAleatoria() {
    const hoy = new Date();
    const diasAleatorios = Math.floor(contFecha -= 0.1);
    hoy.setDate(hoy.getDate() - 20 - diasAleatorios);
    return hoy;
}

function generateRandomNumber(min, max) {
    let payment = Math.floor(Math.random() * (max - min + 1) + min);
    return payment * (Math.random() < 0.5 ? -1 : 1);
}

function getRandomIntegerBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function generateRandomSpendingCategory(appStore){
    var categoryIndex = getRandomIntegerBetween(0, appStore.getSpendingCategories().length-1);
    return appStore.getSpendingCategories()[categoryIndex];
}
function generateRandomEarningCategory(appStore){
    var categoryIndex = getRandomIntegerBetween(0, appStore.getEarningCategories().length-1);
    return appStore.getEarningCategories()[categoryIndex];
}

export { initializeApp, generarNumeroTarjeta, generateAndAddCreditCards, generateAndAddContacts };
