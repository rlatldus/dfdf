<template>
    <div>

    </div>
</template>
<script>
export default {
    name: "promotionIndex",
    components: {
      
    },
    data: () => ({
        // pending: false,
        // waves: [],
        // wave: null,
        // showDetail: false,
        // addWave: {
        //     _id: null,
        //     year: null,
        //     text: null,
        //     start: null,
        //     end: null,
        //     ranges: [],
        //     half: null
        // }
    }),
    created () {
        
    },
    methods: {
        // async load () {
        //     this.pending = true
        //     try {
        //         const url = `/info/wave`
        //         const method = `get`

        //         const {data} = await this.axios({
        //             url,
        //             method
        //         })
        //         const {waves} = data
        //         this.waves = waves
        //         const currentWave = this.waves.find(w => w.current)
        //         if (currentWave) this.wave = currentWave.text
        //     } catch (e) {
        //         console.log(e)
        //     }
        //     this.pending = false
        // },
        // async currentWaveSave () {
        //     axios.get(this.$store.state.serverApi + "/admin/address/sido", {headers: {"Authorization": sessionStorage.getItem("token")}}).then(response => {
        //     this.sidoItems=[];
        //     this.sidoItems2=[];
        //     this.sidoItems.push({label: '전체', value: ''});
        //     this.sidoItems2.push({label: '선택', value: ''});
        //     for(let i=0; i<response.data.data.length; i++) {
        //       this.sidoItems.push({
        //         label: response.data.data[i].sido,
        //         value: response.data.data[i].sidoCd
        //       });
        //       this.sidoItems2.push({
        //         label: response.data.data[i].sido,
        //         value: response.data.data[i].sidoCd
        //       });
        //     }  
        //   })
        //   .catch(error => {
        //     this.errorMessage = error.message;
        //     console.error("There was an error!", error);
        //   });
        // },
        
    },
    computed: {
        
    }
}

</script>
<style scoped>

</style>