import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './style.less'
import capsule from '../../assets/imgs/1.png'
import Capsule from '../../components/Capsule'

interface State{
  capsules?:object[],
  inputKey?:string
}

export default class Open extends React.Component<State> {
  state:State={
    capsules:[],
    inputKey:''
  }
  switchTime(time:string):number{
    let arr=time.trim().split(' ');
    let YMD=arr[0].split('-').map(item=>{
        return Number(item)
    }),
    HMS=arr[1].split(':').map(item=>{
        return Number(item)
    });
    let dateTime=YMD.concat(HMS);
    let date=new Date(dateTime[0],dateTime[1]-1,dateTime[2],dateTime[3],dateTime[4],dateTime[5])
    let seconds=date.getTime();
    return seconds
}
  getData(){
    //console.log(key);
    let _this=this;
    let form={
      id:this.state.inputKey
    }
    fetch('http://127.0.0.1:3280/api/get',{
        method: 'POST', // or 'PUT'
        body: JSON.stringify(form), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    .then((res)=>{
        return res.json();
    })
    .then(response => {
      let data={
        seconds:_this.switchTime(response.time),
        count:_this.switchTime(response.time),
        name:response.name,
        email:response.email,
        time:response.time,
        content:response.content,
        tip:response.tip
      };

      _this.state.capsules.push(data)
      console.log(_this.state.capsules)
      //console.log(_this.state.capsules)
      this.setState({
        capsules:_this.state.capsules
      })
    })
    .catch(error => console.error('Error:', error))
  }
  init(){
    this.setState({
      inputKey:''
    })
  }
  render() {
    let _this=this;
    return (
      <>
        <div className={style.container}>
          <div className={style.top}>
              <div className={style.top_icon}>
                  <img className={style.icon} src={capsule} alt=""/>
                  <span className={style.icon_title}>时光胶囊</span>
              </div>
              <div className={style.top_btn}>
                <span><Link to="/">首页</Link></span>
                <span><Link to="/put">添加</Link></span>
                <span><Link to="/open">打开</Link></span>
              </div>
              <span className={style.top_back}>
                  回胶囊日记
              </span>
          </div>
          <div className={style.content}>
              <form className={style.content_form} action="">
                  <h1>打开胶囊</h1>
                  <div className={style.input}>
                      <label>胶囊key：</label>
                      <input id={style.putKey} type="text" value={_this.state.inputKey} onChange={
                          (e)=>{
                            _this.setState({
                              inputKey:e.target.value
                            })
                          }
                        } /> 
                      <span id={style.open} className={style.open_key} onClick={
                        (e)=>{
                          _this.getData();
                        }
                      }>打开胶囊</span>
                  </div>
              </form>
              <div className={style.opened_content}>
                  {
                    _this.state.capsules.map((item:any)=>{
                      return <Capsule key={item.seconds} data={item}/>
                    })
                  }
              </div>
          </div>
        </div>
      </>
    )
  }

}