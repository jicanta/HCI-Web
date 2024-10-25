<script setup>
    import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore';
    import { number } from 'echarts';
    import { defineProps } from 'vue';

    const props = defineProps({
        id:{
            type: Number,
            required: true
        },
        type:{
            type: String,
            required: true
        },
        cardNumber:{
            type: String, 
            required: true
        }
    });

    const paymentMethodsStore = usePaymentMethodsStore();

</script>


<template>
    <v-card-text class="d-flex justify-space-between align-center pa-0">
        <v-container>
        <v-row class="align-center justify-space-between">
            <v-col >
            <div class="d-flex flex-column">
                <div class="text-subtitle-1">{{ type }}</div>
                <div>{{ cardNumber }}</div>
            </div>
            </v-col>

            <v-col class="d-flex justify-end">
            <v-img
                :src="paymentMethodsStore.cardLogo(type)"
                max-width="50"
                contain
                class="card-logo "
            ></v-img>
            </v-col>
        </v-row>
        </v-container>
        <div class="pr-2">
        <v-btn
        v-if="editState"
        icon
        small
        @click="paymentMethodsStore.removePaymentMethod(id)"
        class="remove-btn"
        >
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        </div>
  </v-card-text>
</template>