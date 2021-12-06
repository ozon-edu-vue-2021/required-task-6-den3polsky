<template>
    <div>
        <div class="paginator-wrapper" v-if="type === 'pages'">        
            <div class="paginagtor"> 
              <div>Страницы:</div>        
              <div class="page-number"
                  :class="{'active-page': page === currentPage }"
                  v-for="page in visibelPagesNumbers" :key="page" @click="currentPage = page"              
              >               
                  {{page}}               
              </div>          
            </div>

          <div class="count-rows-select-wrapper">
                <div>Количество строк: </div>
                <div v-for="coutRows in [10, 20, 30, 40, 50, 100]"
                     :key="coutRows"
                      @click="pageSize = coutRows; currentPage = 1"
                        :class="{'active-page': pageSize === coutRows }"
                >
                      {{coutRows}}
                </div>

          </div>

        </div>

        <div class="tabel-info">
              Количество элементов таблицы всего: {{rowsCount}} 
              <template v-if="rowsCount !== filtredRowsCount"> 
                  , отфильтровано: {{filtredRowsCount}}
              </template>
        </div>

        <table class="tabel">
              <thead>
                  <tr>
                      <td v-for="column in visibelColumns" :key="column">
                        <div>
                          <span>{{options[column].name}}</span>
                          <template v-if="options[column].sorted">
                                <span v-if="options[column].sortDirection === 0" class="sort-button"
                                      @click="options[column].sortDirection = 1"
                                >⇅</span>                            
                                <span v-else-if="options[column].sortDirection === 1" class="sort-button"
                                      @click="options[column].sortDirection = -1"
                                >↓</span>
                                <span v-else  @click="options[column].sortDirection = 0" class="sort-button">🠕</span>      
                          </template>
                        </div>
                        
                        <div v-if="options[column].filtred">
                              <input type="text" class="tabel-filter-input" v-model="options[column].filterValue">
                        </div>

                      </td>
                  </tr>
              </thead>

              <tr v-for="(row, index) in filtredSortedRows" :key="index">
                  <td v-for="column in visibelColumns" :key="column + '-' + index">
                      {{row[column]}}
                  </td>
              </tr>
          </table>
    </div>
</template>

<script>

const countPagesInPagination = 5

export default {

  components: {
   
  },

  props: {
    rows: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'pages'
    }
  },

  mounted () {

    if (this.type === "infinity") {

        window.onscroll = () => {

            const docView = document.documentElement
            let bottomOfWindow = docView.scrollTop + window.innerHeight >= docView.offsetHeight       

            if (bottomOfWindow && !this.isLoad) {

                this.isLoad = true
                this.$emit('loadMore')                
            }
      }
    }


  },

  data () {

    return {

      isLoad: false,
      currentPage: 1,
      pageSize: 30,
      filtredRowsCount: 0

    }
  },

  methods: {
    
  },

  watch: {
      rowsCount (val, oldVal) {
          this.isLoad = false
      }
    },

  computed: {

    
    rowsCount() {

      return this.rows.length
    },

    visibelPagesNumbers() {

        const pagesCount = Math.ceil(this.filtredRowsCount / this.pageSize)
        const pages = [...Array(pagesCount + 1).keys()].slice(1)         
        return pages.filter(page => Math.abs(page - this.currentPage) < countPagesInPagination || page === pagesCount  || page === 1)
 
    },

    visibelColumns () {

        return Object.keys(this.options).filter(colName => this.options[colName].checked)
    },


    filtredSortedRows() {

      let rows = this.rows.filter(row => {
                
              return this.visibelColumns.every(column => {

                      if (this.options[column].filtred && this.options[column].filterValue.length > 0) {
                          return  row[column].toString().toLowerCase().includes(this.options[column].filterValue)
                      } else {
                          return true
                      }
                })
        })

      this.filtredRowsCount = rows.length


      rows = rows.sort((a,b) => {

            let sort = 0

            for (const column of this.visibelColumns) {

                if (this.options[column].sortDirection !== 0) {


                    let compareResult = 0

                    switch (typeof a[column]) {

                        case 'string':  
                              compareResult = a[column].localeCompare(b[column])
                              break
                        case 'number':
                              compareResult =   a[column] - b[column]

                    }              

                    if (compareResult !== 0 ) {
                        
                        return compareResult * this.options[column].sortDirection 
                    }                  
                }
            }
            return sort
          })

        if (this.type === 'pages') {

          const start = (this.currentPage - 1) * this.pageSize
          const end = start + this.pageSize
          
          rows = rows.slice(start, end)
        }
        
        return rows

    },

  }

}
</script>

<style>

.tabel {
    border-collapse: collapse;
}

.tabel td {
    border: 1px solid black;
}

.sort-button {
    cursor: pointer;
    margin: 0px 5px;
    font-size: 18px;
    padding: 0px 4px;

}


.tabel-filter-input {
  widows: 96%;
}

.paginator-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.paginagtor {
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
}

.count-rows-select-wrapper {
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
}

.count-rows-select-wrapper div {
   padding: 2px 4px;
    margin: 0px 4px;
    cursor: pointer;
}

.paginagtor .page-number {
    padding: 2px 4px;
    margin: 0px 4px;
    cursor: pointer;
}

.active-page {
  background-color: blue;
  color: white;
}

.tabel-info {
  position: sticky;
  top: 0px;
  background-color: white;
}

table thead {
  position: sticky;
  top: 15px;
  background-color: white;
  font-weight: bold;
}
table thead td {
  border: 1px solid;
}
  

</style>
