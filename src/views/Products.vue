<template>
    <div id="products">
        <h2>Productos</h2>

        <div id="searchProduct" class="d-inline">
            <b-form-input class="d-inline w-25" type="search" placeholder="Buscar producto" v-model="search" @keyup.enter.native="searchProduct" @input="clearSearch"></b-form-input>
            <b-button variant="outline-success" class="my-2 my-sm-0" type="button" @click="searchProduct">Buscar</b-button>
        </div>
        
        <b-button @click="$bvModal.show('modal-product');modify = false;product.code={value:'',state:null, validate:validateCode}" variant="primary" class="float-right">Agregar un producto</b-button>
        <b-modal id="modal-product" title="Producto" @ok="preventAddProduct">
            <form ref="Product" @submit.stop.prevent="sendAddProduct">
                <label for="Code">Código</label>
                <b-input id="Code" type="text" placeholder="Escriba un código" v-model="product.code.value" :state="product.code.state" @blur="validateCode(product.code)" :disabled="modify"></b-input>

                <label for="Description">Descripción</label>
                <b-input id="Description" type="text" placeholder="Escriba una descripción" v-model="product.description.value" :state="product.description.state" @blur="validateText(product.description)"></b-input>

                <label for="BaseCost">Costo base</label>
                <b-input id="BaseCost" type="text" placeholder="Escriba un costo base" v-model="product.baseCost.value" :state="product.baseCost.state" @blur="validateFloat(product.baseCost)"></b-input>

                <label for="wPercentage">Porcentaje mayoreo</label>
                <b-input id="wPercentage" type="number" placeholder="Escriba un porcentaje" v-model="product.wPercentage.value" :state="product.wPercentage.state" @change="validateInt(product.wPercentage)" @blur="validateInt(product.wPercentage)"></b-input>

                <label for="rPercentage">Porcentaje menudeo</label>
                <b-input id="rPercentage" type="number" placeholder="Escriba un porcentaje" v-model="product.rPercentage.value" :state="product.rPercentage.state" @change="validateInt(product.rPercentage)" @blur="validateInt(product.rPercentage)"></b-input>

                <label for="Classification">Clasificación</label>
                <b-form-select id="Classification" :options="classifications" v-model="product.classification.value" :state="product.classification.state" @change="validateSelect(product.classification)"></b-form-select>

                <label for="Inventory">Inventario</label>
                <b-input id="Inventory" type="text" placeholder="Escriba un inventario" v-model="product.inventory.value" :state="product.inventory.state" @blur="validateFloat(product.inventory)"></b-input>

                <label for="Measure">Unidad de medida</label>
                <b-form-select id="Measure" :options="measures" v-model="product.measure.value" :state="product.measure.state" @change="validateSelect(product.measure)"></b-form-select>

                <label for="Provider">Proovedor</label>
                <b-form-select id="Provider" :options="providers" v-model="product.provider.value" :state="product.provider.state" @change="validateSelect(product.provider)"></b-form-select>
            </form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="cancel">
                    Cancelar
                </b-button>
                <b-button variant="primary" @click="ok()" v-if="!modify">
                    Agregar
                </b-button>
                <b-button variant="primary" @click="ok()" v-if="modify">
                    Modificar
                </b-button>
            </template>
        </b-modal>

        <b-modal id="modal-remove-product" size="sm" title="Advertencia" header-bg-variant="warning" @ok="sendRemoveData">
            <p>Estas seguro de eliminar {{productRemove.description}}?</p>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button size="sm" variant="secondary" @click="cancel()">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" @click="ok()">
                    OK
                </b-button>
            </template>
        </b-modal>
    
        <b-table id="tableProducts" sticky-header hover bordered small head-variant="dark" :items="items" :fields="fields" responsive :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" style="min-height: 75vh;">
            <template v-slot:cell(edit)="row">
                <b-button variant="secondary" size="sm" @click="getModify(row.item._id)">Editar</b-button>
            </template>
            <template v-slot:cell(remove)="row">
                <b-button variant="danger" size="sm" @click="showRemoveModal(row.item)">X</b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            fields:[{
                    key:'code',
                    label:'Código',
                    sortable:true
                },{
                    key:'description',
                    label:'Descripción',
                    sortable:true
                },{
                    key:'baseCost',
                    label:'Costo Base',
                    sortable:false
                },{
                    key:'cost',
                    label:'Costo',
                    sortable:false
                },{
                    key:'wCost',
                    label:'Costo mayoreo',
                    sortable:false
                },{
                    key:'rCost',
                    label:'Costo menudeo',
                    sortable:false
                },{
                    key:'classification',
                    label:'Clasificación',
                    sortable:true
                },{
                    key:'inventory',
                    label:'Inventario',
                    sortable:true
                },{
                    key:'measure',
                    label:'Unidad',
                    sortable:true
                },{
                    key:'provider',
                    label:'Proveedor',
                    sortable:true
                },{
                    key:'edit',
                    label:'Editar',
                    sortable: false
                },{
                    key:'remove',
                    label:'Eliminar',
                    sortable: false
                }
            ],
            items:[],
            classifications:[{value:null, text:'Seleccione una clasificación'}],
            measures:[{value:null, text:'Seleccione una medida'}],
            providers:[{value:null, text:'Seleccione un proveedor'}],
            product:{
                code:{value:'', state:null, validate:this.validateCode},
                description:{value:'', state:null, validate:this.validateText},
                baseCost:{value:'0', state:null, validate:this.validateFloat},
                wPercentage:{value:'0', state:null, validate:this.validateInt},
                rPercentage:{value:'0', state:null, validate:this.validateInt},
                classification:{value:null, state:null, validate:this.validateSelect},
                inventory:{value:'0', state:null, validate:this.validateFloat},
                measure:{value:null, state:null, validate:this.validateSelect},
                provider:{value:null, state:null, validate:this.validateSelect}
            },
            productRemove:{},
            modify:false,
            sortBy: 'code',
            sortDesc: false,
            search:''
        }
    },
    mounted(){
        this.getClassifications();
        this.getMeasures();
        this.getProvider();
        this.getTable();
    },
    methods:{
        getTable(){
            this.items = [];
            axios.get(this.$store.state.serverPath + 'product')
            .then(res => {
                for(var product of res.data)
                    this.items.push(this.getItem(product));
            })
            .catch(err => {
                console.log(err);
            });
        },
        getItem(product){
            return {
                _id:product._id,
                code:product.code,
                description:product.description,
                baseCost:'$ ' + parseFloat(product.baseCost).toFixed(2).toString(),
                cost:'$ ' + (product.baseCost * 1.16).toFixed(2).toString(),
                wCost:'$ ' + ((product.wPercentage * 0.01 + 1) * 1.16 * product.baseCost).toFixed(2).toString(),
                rCost:'$ ' + ((product.rPercentage * 0.01 + 1) * 1.16 * product.baseCost).toFixed(2).toString(),
                classification:product.classification.description,
                inventory:product.inventory,
                measure:product.measure.description,
                provider:product.provider.name
            }
        },
        getClassifications(){
            axios.get(this.$store.state.serverPath + 'classification')
            .then(res => {
                for(var classification of res.data){
                    let item = {
                        value:classification._id,
                        text:classification.description
                    };
                    this.classifications.push(item);
                }
            });
        },
        getMeasures(){
            axios.get(this.$store.state.serverPath + 'measure')
            .then(res => {
                for(var measure of res.data){
                    let item = {
                        value:measure._id,
                        text:measure.description
                    };
                    this.measures.push(item);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        getProvider(){
            axios.get(this.$store.state.serverPath + 'provider')
            .then(res => {
                for(var provider of res.data){
                    let item = {
                        value:provider._id,
                        text:provider.name
                    };
                    this.providers.push(item);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        getModify(_id){
            axios.get(this.$store.state.serverPath + 'product/' + _id)
            .then(res => {
                for(var input in this.product)
                    this.product[input].value = res.data[input];
                this.product.code.state = null;
                this.modify = true;
                this.$bvModal.show('modal-product');
            })
            .catch(err => {
                console.log(err);
            });
        },
        showRemoveModal(product){
            this.productRemove = product;
            this.$bvModal.show('modal-remove-product');
        },
        preventAddProduct(bvModalEvt) {
            bvModalEvt.preventDefault();
            if(this.modify)
                this.sendModifyProduct();
            else
                this.sendAddProduct();
        },
        sendAddProduct(){
            if(this.validateProduct()){
                axios.post(this.$store.state.serverPath + 'product',this.chargeData())
                .then(res => {
                    if(res.status == 200){
                        this.product.code = {value:'', state:null, validate:this.validateCode};
                        this.items.push(this.getItem(res.data));
                        this.$nextTick(() => {
                            this.$bvModal.hide('modal-product');
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },
        sendModifyProduct(){
            if(this.validateProduct()){
                axios.put(this.$store.state.serverPath + 'product', this.chargeData())
                .then(res => {
                    if(res.status == 200){
                        for(var i = 0; i < this.items.length; i++){
                            if(this.items[i]._id == res.data._id){
                                this.items.splice(i, 1);
                                this.items.push(this.getItem(res.data));
                                break;
                            }
                        }
                        this.product.code = {value:'', state:null, validate:this.validateCode};
                        this.$nextTick(() => {
                            this.$bvModal.hide('modal-product');
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },
        sendRemoveData(){
            axios.delete(this.$store.state.serverPath + 'product/' + this.productRemove._id)
            .then(res => {
                if(res.status == 200){
                    for(var i = 0; i < this.items.length; i++){
                        if(this.items[i]._id == this.productRemove._id){
                            this.items.splice(i, 1);
                            break;
                        }
                    }
                    this.productRemove = {};
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        chargeData(){
            let data = {};
            for(const input in this.product){
                data[input] = this.product[input].value;
            }
            return data;
        },
        clearSearch(){
            if(this.search == ""){
                this.searchProduct();
            }
        },
        searchProduct(){
            if(this.search != ""){
                axios.get(this.$store.state.serverPath + 'find/product/' + this.search)
                .then(res => {
                    this.items = [];
                    for(var product of res.data)
                        this.items.push(this.getItem(product));
                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                this.getTable();
            }
        },
        validateProduct(){
            for(var input in this.product){
                if(this.product[input].validate == this.validateSelect)
                    this.product[input].validate(this.product[input], true);
                else
                    this.product[input].validate(this.product[input]);
            }
            var send = true;
            for(const input in this.product)
                if(input != '_id' && (input != 'code' || !this.modify)){
                    if(this.product[input].state == false || this.product[input].state == null)
                        send = false;
                }
            return send;
        },
        validateCode(input){
            if(input.value == '')
                input.state = false;
            else{
                axios.get(this.$store.state.serverPath + 'product/code/' + input.value)
                .then(res =>{
                    input.state = (res.data == null || this.modify);
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },
        validateText(input){
            input.state = (input.value.length > 3);
        },
        validateFloat(input){
            input.state = !(input.value.length == 0 || isNaN(input.value));
        },
        validateInt(input){
            if(input.value.length == 0 || isNaN(input.value))
                input.state = false;
            else
                if(input.value.toString().indexOf('.') == -1)
                    if(parseInt(input.value) < 0)
                        input.state = false;
                    else
                        input.state = true;
                else
                    input.state = false;
        },
        validateSelect(input, send = false){
            if(input.value == null)
                if(send)
                    input.state = false;
                else
                    input.state = null;
            else
                input.state = true;
        }
    }
}
</script>

<style scoped>

</style>