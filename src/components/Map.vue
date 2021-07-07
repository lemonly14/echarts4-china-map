<template>
  <div class="echarts4">
    <div id="map"
         ref="map" />
  </div>
</template>

<script>
import echarts from 'echarts'
// import chinaJson from 'echarts/map/json/china.json'
import Cookies from 'js-cookie'
import { cityCode, provinceCode } from '../utils/codeMap'
import mapRegister from '@/utils/mapRegister'
import { makeMapSeries, mapConfigOption } from '@/utils/mapUtils.js'

export default {
  name: 'Echarts4',
  props: {

  },
  data() {
    return {
      ChinaMap: null,
      code: 'china',
      chinaMapSeries: null
    }
  },

  async mounted() {
    this.ChinaMap = echarts.init(this.$refs['map'])
    let mapCode
    this.ChinaMap.on('click', async(data) => {
      mapCode = provinceCode[data.name] || cityCode[data.name]
      this.renderMap(mapCode)
    })
    this.renderMap()
    window.onresize = () => {
      this.ChinaMap.resize({
        width: 'auto',
        height: 'auto'
      })
    }
    this.getMapOffset()
    window.addEventListener('resize', () => { // 监听浏览器窗口大小改变
      this.getMapOffset() // 浏览器变化执行动作
    })
  },
  destroyed() {
    this.ChinaMap = null
    this.chinaMapSeries = null
  },
  methods: {
    async renderMap(mapCode) {
      const code = mapCode || '100000'
      await mapRegister(code)
      this.chinaMapSeries = makeMapSeries({ name: code, map: code })
      mapConfigOption.series = []
      mapConfigOption.series.push(this.chinaMapSeries)
      mapConfigOption.geo.map = code
      this.ChinaMap.setOption(mapConfigOption)
    },
    getMapOffset() {
      this.$nextTick(() => {
        console.log('this.$refs.map', this.$refs.map)
        const offsetHeight = this.$refs.map.offsetHeight || this.$refs.map.$el.offsetHeight
        const offsetWidth = this.$refs.map.offsetWidth || this.$refs.map.$el.offsetWidth
        Cookies.set('offsetHeight', offsetHeight)
        Cookies.set('offsetWidth', offsetWidth)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echarts4 {
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
