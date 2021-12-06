<template>
    <div>
        <Tabel :rows="rows" :options="options" type="infinity" @loadMore="loadMoreHandler"/>
        <button class="load-more-btn" @click="loadMoreHandler">Загрузить еще</button>
    </div>
</template>

<script>
import Tabel from '@/components/Tabel.vue'
const url = 'http://jsonplaceholder.typicode.com/photos'
const limit = 100

export default {

  components: {
    Tabel
  },

 data () {

        return {
            
            start: 0,            
            rows: [],
            options: {}
        }
    },
  
  computed: {

  },

  async created () {

        this.rows = await this.load(limit)
        this.options = this.configTabelOptions(this.rows[0])        
  },  

  methods: {

        async loadMoreHandler() {

            const newRows = await this.load(limit)
            this.rows = [...this.rows, ...newRows]
        },

        configTabelOptions(row) {

            const options = {}
            
            for (const prop in row) {

                    options[prop] = { name: prop, checked: true, filtred: true, sorted: true, sortDirection: 0, filterValue: '' }
                }            
            
            return options
        },


        async load(limit) {

            try {    
                    const response = await fetch(url + `?_start=${this.start}&_limit=${limit}`)
                    const data = await response.json()                                
                    this.start += limit
                    return data

                } catch(ex) {                    
                    console.log('Ошибка получения данных' + ex)
                    return []
                }
        }


  },

}
</script>


<style scoped>
.load-more-btn {
    margin-top: 20px;
}
</style>