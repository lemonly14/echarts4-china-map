
import echarts from 'echarts'
import Axios from 'axios'

export default async code => {
  if (echarts.getMap(code)) {
    return
  }
  const { data } = await Axios.get(`/geo-json/${code}.json`)
  echarts.registerMap(code, data)
}
