import { User, CreditCard, Payment } from "./classes";
import { ref } from 'vue';

const users = ref([
    { email: "fmagri@gmail.com", password: "123456", firstName: "Federico", lastName: "Magri", phoneNumber: "1145678901" , dni: "43567890", username: "fmagri" },
    { email: "jcantarella@gmail.com", password: "123456", firstName: "Juan", lastName: "Cantarella", phoneNumber: "1123456789" , dni: "42345678", username: "jcantarella" },
    { email: "lbarrios@gmail.com", password: "123456", firstName: "Lucas", lastName: "Barrios", phoneNumber: "1187654321" , dni: "48765432", username: "lbarrios" },
    { email: "ana.lopez@test.com", password: "clave4321", firstName: "Ana", lastName: "López", phoneNumber: "1156789012" , dni: "45678901", username: "analopez" },
    { email: "pedro.martinez@test.com", password: "segura5678", firstName: "Pedro", lastName: "Martínez", phoneNumber: "1178901234" , dni: "47890123", username: "pmartinez" },
    { email: "laura.sanchez@test.com", password: "laura2023", firstName: "Laura", lastName: "Sánchez", phoneNumber: "1190123456" , dni: "49012345", username: "lsanchez" },
    { email: "miguel.fernandez@test.com", password: "miFer1234", firstName: "Miguel", lastName: "Fernández", phoneNumber: "1112345678" , dni: "41234567", username: "mfernandez" },
    { email: "sofia.torres@test.com", password: "sofi9876", firstName: "Sofía", lastName: "Torres", phoneNumber: "1134567890" , dni: "43456789", username: "storres" },
    { email: "javier.ruiz@test.com", password: "javi4567", firstName: "Javier", lastName: "Ruiz", phoneNumber: "1167890123" , dni: "46789012", username: "jruiz" },
    { email: "carmen.diaz@test.com", password: "carmenD22", firstName: "Carmen", lastName: "Díaz", phoneNumber: "1189012345" , dni: "44901234", username: "cdiaz" }
]);

function initializeApp(appStore) {

    users.value.forEach(user => {
        appStore.addUser(user.email, user.username, user.password, user.firstName, user.lastName, user.dni, user.phoneNumber);
    });
    generateAndAddCreditCards(appStore);
    generateAndAddContacts(appStore);
}

function generateAndAddCreditCards(appStore) {
    for(let i = 0; i < users.value.length; i++){
        for(let j = 0; j < 2; j++){
            appStore.setCurrentUser(i);
            appStore.addCreditCard(
                generarNumeroTarjeta(),
                users.value[i].firstName + " " + users.value[i].lastName,
                Math.floor(Math.random() * 1000).toString().padStart(3, '0')
            );
        }
    }
    appStore.setCurrentUser(0); // para que no quede seleccionado ningún usuario
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
                appStore.addContact(users.value[j]);

                appStore.addPayment(generateRandomNumber(1000,100000), new Date(), users.value[j], true);
                appStore.addPayment(generateRandomNumber(1000,100000), new Date(), users.value[j], true);
            }
        }
    }
}

function generateRandomNumber(min, max) {
    let payment = Math.floor(Math.random() * (max - min + 1) + min);
    return payment * (Math.random() < 0.5 ? -1 : 1);
}

export { initializeApp, generarNumeroTarjeta, generateAndAddCreditCards, generateAndAddContacts };
