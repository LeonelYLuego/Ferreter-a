<template>
    <div id="products">
        <h2>Productos</h2>

        <b-button @click="$bvModal.show('modal-product')" class="float-right" variant="primary">Agregar un producto</b-button>
        <b-modal id="modal-product" title="Agregar un producto">
            <label for="addCode">Código</label>
            <b-input id="addCode" type="text" placeholder="Escriba un código" v-model="product.code.value" :state="product.code.state" @blur="validateCode"></b-input>

            <label for="addDescription">Descripción</label>
            <b-input id="addDescription" type="text" placeholder="Escriba una descripción" v-model="product.description.value" :state="product.description.state" @blur="validateText(product.description)"></b-input>

            <label for="addCost">Costo</label>
            <b-input id="addCost" type="text" placeholder="Escriba un costo" v-model="product.cost.value" :state="product.cost.state" @blur="validateFloat(product.cost)"></b-input>

            <label for="addwPercentage">Porcentaje mayoreo</label>
            <b-input id="addwPercentage" type="number" placeholder="Escriba un porcentaje" v-model="product.wPercentage.value" :state="product.wPercentage.state" @change="validateInt(product.wPercentage)" @blur="validateInt(product.wPercentage)"></b-input>

            <label for="addrPercentage">Porcentaje menudeo</label>
            <b-input id="addrPercentage" type="number" placeholder="Escriba un porcentaje" v-model="product.rPercentage.value" :state="product.rPercentage.state" @change="validateInt(product.rPercentage)" @blur="validateInt(product.rPercentage)"></b-input>

            <label for="addClassification">Clasificación</label>
            <b-form-select id="addClassification" :options="classifications" v-model="product.classification.value" :state="product.classification.state" @change="validateSelect(product.classification)"></b-form-select>

            <label for="addInventory">Inventario</label>
            <b-input id="addInventory" type="text" placeholder="Escriba un inventario" v-model="product.inventory.value" :state="product.inventory.state" @blur="validateFloat(product.inventory)"></b-input>

            <label for="addMeasure">Unidad de medida</label>
            <b-form-select id="addMeasure" :options="measures" v-model="product.measure.value" :state="product.measure.state" @change="validateSelect(product.measure)"></b-form-select>

            <label for="addProvider">Proovedor</label>
            <b-form-select id="addProvider" :options="providers" v-model="product.provider.value" :state="product.provider.state" @change="validateSelect(product.provider)"></b-form-select>

            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="cancel">
                    Cancelar
                </b-button>
                <b-button variant="primary" @click="ok()">
                    Agregar
                </b-button>
            </template>
        </b-modal>

        <b-table sticky-header hover bordered small head-variant="dark" :items="items" :fields="fields" responsive>
            <template v-slot:cell(edit)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="secondary">Editar</b-button>
            </template>
            <template v-slot:cell(remove)="row">
                <b-button :id="row.item._id" variant="danger" size="sm">X</b-button>
                <!-- <b-popover :target="row.item._id" triggers="focus" placement="auto" variant="warning">
                    Estas seguro de eliminar {{ row.item.description }}?
                    <br>
                    <b-button variant="danger" size="sm" @click="remove(row.item)">Eliminar</b-button>
                </b-popover> -->
            </template>
            <template v-slot:row-details="row">
                    <!-- {{row.item.Costo}}<br>
                    <b-button size="sm" @click="row.toggleDetails">Cancelar</b-button> -->
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
                    label:'Proovedor',
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
                _id:'',
                code:{value:'', state:null},
                description:{value:'', state:null},
                cost:{value:'0', state:null},
                wPercentage:{value:'0', state:null},
                rPercentage:{value:'0', state:null},
                classification:{value:null, state:null},
                inventory:{value:'0', state:null},
                measure:{value:null, state:null},
                provider:{value:null, state:null}
            }
        }
    },
    mounted(){
        this.getTable();
        this.getClassifications();
        this.getMeasures();
        this.getProvider();
    },
    methods:{
        getTable(){
            axios.get('http://localhost:3000/product')
            .then(res => {
                for(var product of res.data){
                    let item = {
                        _id:product._id,
                        code:product.code,
                        description:product.description,
                        baseCost:product.baseCost,
                        cost:product.baseCost * 1.16, //
                        wCost:product.wPercentage, //
                        rCost:product.rPercentage, //
                        classification:product.classification.description,
                        inventory:product.inventory,
                        measure:product.measure.description,
                        provider:product.provider.name
                    };
                    this.items.push(item);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        getClassifications(){
            axios.get('http://localhost:3000/classification')
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
            axios.get('http://localhost:3000/measure')
            .then(res => {
                for(var measure of res.data){
                    let item = {
                        value:measure._id,
                        text:measure.description
                    };
                    this.measures.push(item);
                }
            });
        },
        getProvider(){
            axios.get('http://localhost:3000/provider')
            .then(res => {
                for(var provider of res.data){
                    let item = {
                        value:provider._id,
                        text:provider.name
                    };
                    this.providers.push(item);
                }
            });
        },
        remove(row){
            alert(row.description);
            console.log(this);
            this.popoverShow = false
        },
        validateCode(){
            if(this.product.code.value == '')
                this.product.code.state = false;
            else{
                axios.get('http://localhost:3000/product/code/' + this.product.code.value)
                .then(res =>{
                    if(res.data == null)
                        this.product.code.state = true;
                    else
                        this.product.code.state = false;
                });
            }
        },
        validateText(input){
            if(input.value.length > 3)
                input.state =  true;
            else
                input.state = false;
        },
        validateFloat(input){
            if(input.value.length == 0 || isNaN(input.value))
                input.state = false;
            else
                input.state = true;
        },
        validateInt(input){
            if(input.value.length == 0 || isNaN(input.value))
                input.state = false;
            else
                if(input.value.indexOf('.') == -1)
                    if(parseInt(input.value) < 0)
                        input.state = false;
                    else
                        input.state = true;
                else
                    input.state = false;
        },
        validateSelect(input){
            if(input.value == null)
                input.state = null;
            else
                input.state = true;
        }
    }
}
</script>

<style scoped>

</style>