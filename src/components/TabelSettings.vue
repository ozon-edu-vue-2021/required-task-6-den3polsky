<template>
    <div>
    <div class="options-wrapper" v-show="showTabelSettings">
          <Draggable v-model="tabelOptions">
            <div v-for="columnName in tabelOptions" :key="options[columnName].name" class="options">

                <div class="arrow">⇕</div>


                <div class="option option-name">
                      <input type="checkbox" :checked="options[columnName].checked" @change="setOption(columnName, 'checked', $event.target.checked)" :id="options[columnName].name">
                      <label :for="options[columnName].name">{{options[columnName].name}}</label>
                </div>
                 <div class="option option-sort">
                      <input type="checkbox" :checked="options[columnName].sorted"  @change="setOption(columnName, 'sorted', $event.target.checked)" :id="'sort-' + options[columnName].name">
                      <label :for="'sort-' + options[columnName].name">Сортировка</label>
                </div>

                 <div class="option option-filtr">
                      <input type="checkbox" :checked="options[columnName].filtred" @change="setOption(columnName, 'filtred', $event.target.checked)" :id="'filtred-' + options[columnName].name">
                      <label :for="'filtred-' + options[columnName].name">Фильтрация</label>
                </div>
              </div>
          </Draggable>
        </div>

     <button @click="showTabelSettings = !showTabelSettings">Настройки колонок</button>

    </div>
</template>

<script>
import Draggable from 'vuedraggable'


export default {

  props: {        
    options: {
      type: Object,
      default: () => {}
    },
  },

  components: {
    Draggable
  },

  data() {
        return {
            showTabelSettings: false
        }
  },


  methods: {

      setOption(field, optionName, value) {
           

           const newOptions = {...this.options}
           newOptions[field][optionName] = value            
           this.$emit('setOptions', newOptions)
      
      }
          
  },
    

  computed: {

     tabelOptions: {

                get () {
                    return Object.keys(this.options)
                },
                set (fields) {

                    const newSortOptions = {}

                    for (const fieldName of fields) {
                        newSortOptions[fieldName] = this.options[fieldName]
                    }

                   this.$emit('setOptions', newSortOptions)
                }
        }
    }
    
}
</script>



<style scoped>
.arrow {font-size: 20px;
    padding: 0px 10px;
    border: 1px solid #80808063;}

.option-name{
    min-width: 80px;
}
.options-wrapper{padding: 5px;}

.options {
  display: flex;
  margin: 2px 0px;
  cursor: pointer;
  font-size: 12px;
  border: 1px solid #8080808c;
}

.option {
  display: flex;
  align-items: center;  
}

</style>