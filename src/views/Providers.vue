<template>
    <div id="Providers">
        <h2>Proveedores</h2>
        <div>
            <b-input type="search" placeholder="Buscar" style="width:25vw; display:inline; min-width: 200px"></b-input>
            <b-button type="button" variant="outline-success" style="margin-bottom: 4px;">Buscar</b-button>
            <b-button type="button" variant="primary" v-b-modal.modalProvider style="float:right;">Agregar proveedor</b-button>
        </div>
        <b-modal id="modalProvider" title="Proveedor">
            <b-form>
                <label for="name">Nombre</label>
                <b-input
                    id="name"
                    type="text"
                    placeholder="Escriba un nombre"
                    v-model="provider.name.value"
                    :state="provider.name.state"
                ></b-input>
                <label for="rfc">rfc</label>
                <b-input
                    v-for="(rfc, i) in provider.rfc"
                    v-bind:key="'r' + i"
                    v-model="provider.rfc[i].value"
                    @input="pushInput(provider.rfc, i)"
                    :state="provider.rfc[i].state"
                    placeholder="Escriba un RFC"
                ></b-input>
                <label for="email">Correo</label>
                <b-input
                    v-for="(email, i) in provider.email"
                    v-bind:key="'e' + i"
                    v-model="provider.email[i].value"
                    @input="pushInput(provider.email, i)"
                    :state="provider.email[i].state"
                    placeholder="Escriba un correo"
                ></b-input>
                <label for="phone">Teléfono</label>
                <b-input
                    v-for="(phone, i) in provider.phone"
                    v-bind:key="'p' + i"
                    v-model="provider.phone[i].value"
                    @input="pushInput(provider.phone, i)"
                    :state="provider.phone[i].state"
                    placeholder="Escriba un teléfono"
                ></b-input>
            </b-form>
            <b-button @click="sendAddProvider">Enviar</b-button>
        </b-modal>
        <b-table :items="providers" :fields="fields" small bordered hover responsive head-variant="dark" striped>
            <template v-slot:cell(rfc)="row">
                {{row.item.rfc.length > 1 ? '...' : row.value[0]}}
            </template>
            <template v-slot:cell(email)="row">
                {{row.item.email.length > 1 ? '...' : row.value[0]}}
            </template>
            <template v-slot:cell(phone)="row">
                {{row.item.phone.length > 1 ? '...' : row.value[0]}}
            </template>
            <template v-slot:cell(details)="row">
                <b-button size="sm" @click="row.toggleDetails">Detalles</b-button>
            </template>
            <template v-slot:cell(edit)="row">
                <b-button size="sm" variant="primary">Editar</b-button>
            </template>
            <template v-slot:cell(remove)="row">
                <b-button size="sm" variant="danger">X</b-button>
            </template>

            <template v-slot:row-details="row">
                <h4>rfcs</h4>
                <ul>
                    <li v-for="(rfc,i) in row.item.rfc" v-bind:key="i">{{rfc}}</li>
                </ul>
                <h4>Correos</h4>
                <ul>
                    <li v-for="(email,i) in row.item.email" v-bind:key="i">{{email}}</li>
                </ul>
                <h4>Teléfonos</h4>
                <ul>
                    <li v-for="(phone,i) in row.item.phone" v-bind:key="i">{{phone}}</li>
                </ul>
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            providers:[],
            fields:[
                {key:'name',label:'Nombre',sortable:true},
                {key:'rfc', sortable:true},
                {key:'email',label:'Correo',sortable:true},
                {key:'phone',label:'Teléfono',sortable:true},
                {key:'details', label:'Detalles'},
                {key:'edit',label:'Editar'},
                {key:'remove',label:'Eliminar'}
            ],
            provider:{
                name:{value:'', state:false},
                rfc:[{value:'', state:true}],
                phone:[{value:'', state:true}],
                email:[{value:'', state:true}]
            }
        }
    },
    mounted(){
        this.getTable();
    },
    methods:{
        getTable(){
            axios.get(this.$store.state.serverPath + 'provider')
            .then(res => {
                this.providers = [];
                for(var provider of res.data)
                    this.providers.push(this.getProviderTable(provider));
            })
            .catch(err => {
                console.log(err);
            });
        },
        getProviderTable(provider){
            return {
                _id:provider._id,
                name:provider.name,
                rfc:provider.RFC,
                email:provider.email,
                phone:provider.phone
            }
        },
        pushInput(arr, i){
                               ////////Falta fixear esto
            for(var i = 0; i < arr.length; i++)
                if(arr[i].value == '')
                    arr.splice(i, 1);
            arr.push({value:'', state:null});
        },
        sendAddProvider(){
            console.log(this.provider.rfc);
        },
        validateText(input){
            input.state = (input.value.length > 3);
        },
    }
}
</script>

<style scoped>

</style>