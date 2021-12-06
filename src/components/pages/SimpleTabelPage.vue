<template>
    <div>
        <select v-model="activeTabel" class="select-url">
              <option v-for="(tabel) in tables" :key="tabel">
                  {{tabel}}
              </option>
        </select>
        <TabelSettings :options="options" @setOptions="setOptionHandler($event)"/>
        <Tabel :rows="rows" :options="options"/>
    </div>
</template>

<script>
import TabelSettings from '@/components/TabelSettings.vue'
import Tabel from '@/components/Tabel.vue'
const url = 'https://jsonplaceholder.typicode.com/photos'

const tabels =  [
        'https://jsonplaceholder.typicode.com/photos', 
        'https://jsonplaceholder.typicode.com/posts',        
        'https://jsonplaceholder.typicode.com/comments',
        'https://jsonplaceholder.typicode.com/albums',
        'https://jsonplaceholder.typicode.com/todos'
]

export default {

  components: {
    Tabel,
    TabelSettings
  },

 data () {

        return {
            tables: tabels,
            activeTabel: tabels[0],
            rows: [],
            options: {},
            
        }
    },


  watch: {

      async activeTabel() {

             this.rows = await this.load()
             this.options = this.configTabelOptions(this.rows[0])   
      }

  },

  methods: {

      setOptionHandler(options) {

          this.options = options          
          window.localStorage.setItem(this.activeTabel, JSON.stringify(options))
      },

    configTabelOptions(row) {

        let storedOptions = window.localStorage.getItem(this.activeTabel)

        if (storedOptions) {

              storedOptions =  JSON.parse(storedOptions)
              return storedOptions

        } else {

            const options = {}
            
            for (const prop in row) {

                    options[prop] = { name: prop, checked: true, filtred: true, sorted: true, sortDirection: 0, filterValue: '' }
                }    
            return options
        }

      },

      async load() {

            try {    
                    const response = await fetch(this.activeTabel)
                    const data = await response.json()                                                
                    return data

                } catch(ex) {                    
                    console.log('Ошибка получения данных' + ex)
                    return []
                }
        }

  },

  

  async created () {

        this.rows = await this.load()
        this.options = this.configTabelOptions(this.rows[0])      
  },  
}
</script>


<style scoped>
.select-url {
    margin: 10px 0px;
}
</style>