import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    //执行异步请求
    let promise
    if (type === 'GET') {
      //拼接查询参数
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        url +=  '?' + dataStr
      }
      //发送get请求
      promise = axios.get(url);
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      //成功调用
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
