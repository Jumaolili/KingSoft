import * as React from 'react'
import Cookie from 'react-cookies'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './style.module.less'
import capsule from '../../assets/imgs/1.png'
import {useLocalObservable, useObserver, Observer} from 'mobx-react'
import {store} from '../../store/store'
import axios from 'axios'

interface State{
  name?:string,
  email?:string,
  time?:string,
  content?:string,
  tip?:string
}

//判断策略
let Strategies={
  isEmail:function(value:any){
      if(!value){
        return false
      }
      if(!/[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/.test(value)){
          return false;
      }
      return true;
  },  
  isEmpty:function(value:any){
      if(!value){
        return false
      }
      if(value===''){
          return false;
      }
      return true;
  },
  isMore:function(value:any){
      if(!value){
        return false
      }
      if(value.length>5000){
          return false;
      }
      return true;
  },
  isRightTime:function(value:any){
      if(!value){
        return false
      }
      if(value===''){
          return false
      }
      if(typeof value.split !=='function'){
          return false
      }
      let arr=value.split(' ');
      if(arr.length!==2){
          return false
      }
      if(typeof arr[0].split !=='function' ||typeof arr[1].split !=='function'  ){
          return false
      }
      let YMD=arr[0].split('-').length,
          HMS=arr[1].split(':').length;

      if(YMD+HMS!==6){
          return false
      }
      return true;
  }
}



function Put() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [time, setTime] = React.useState('');
  const [content, setContent] = React.useState('');
  const [tip, setTip] = React.useState('');
  // const [color,setColor]=React.useState('red');
  function changeName(value:string){
    setName(value)
  }
  function changeEmail(value:string){
    setEmail(value)
  }
  function changeTime(value:string){
    setTime(value)
  }
  function changeContent(value:string){
    setContent(value)
  }
  function changeTip(value:string){
    setTip(value)
  }
  // function changeColor(){
  //   if(Cookie.load('bar_color')&&Cookie.load('bar_color')=='red'){
  //     Cookie.save('bar_color','skyblue',{path:'/'});
  //   }else{
  //     Cookie.save('bar_color','red',{path:'/'});
  //   }
  //   setColor(Cookie.load('bar_color'))
  // }
  function addCapsule(){
    //进行检测
    if(Strategies.isEmpty(name)&&
    Strategies.isEmpty(email)&&
    Strategies.isEmail(email)&&
    Strategies.isEmpty(time)&&
    Strategies.isRightTime(time)&&
    Strategies.isMore(content)){
      //集结数据
      let form={
        name:name,
        email:email,
        tip:tip,
        time:time,
        content:content
      }
      console.log(form);
      //提交信息
    //   fetch('http://127.0.0.1:3280/api/add',{
    //     method: 'POST', // or 'PUT'
    //     body: JSON.stringify(form), // data can be `string` or {object}!
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     mode: 'cors'
    // })
      axios.post('http://127.0.0.1:3280/api/add',form)
      .then((res)=>{
          init();
          return res;
      })
      .then((response:any) => {
        alert('Success:'+ response.data.id);
        console.log(response.data.id);
      })  
      .catch(error => console.error('Error:', error))
    }else{
      alert('表单信息格式错误或者字数超过5000')
    }
  }
  function init(){
    setEmail('');
    setName('');
    setTime('');
    setTip('');
    setContent('');
  }
  

  // React.useEffect(() => {
  //   if(Cookie.load('bar_color')){
  //     setColor(Cookie.load('bar_color'))
  //   }
  // }, [])

  let localStore = useLocalObservable(() => store); 
  console.log(localStore)
  

  return <Observer>{()=>(
    <div>
      <div className={style.page_container}>
        <div className={style.top}>
          <div className={style.top_icon}>
            <img className={style.icon} src={capsule} alt=""/>
            <span className={style.icon_title}>时光胶囊</span>
          </div>
          <div className={style.top_btn}>
              <span><a href="/">首页</a></span>
              <span><a href="/put">添加</a></span>
              <span><a href="/open">打开</a></span>
          </div>
          <span className={style.top_back} onClick={(e)=>{
            // localStore.setCapsule_color()
            // setColor(localStore.capsule_color)
            // changeColor();
            localStore.setCapsule_color()
            console.log(localStore.capsule_color)
          }}>
              回胶囊日记
          </span>
        </div>
        <div className={style.content}>
          <form className={style.content_form} action="">
            <h1>添加胶囊</h1>
            <p className={style.content_title}>你的名字</p>
            <p className={`${style.check} ${style.check_name} ${Strategies.isEmpty(name)?style.pass:''}`}>{Strategies.isEmpty(name)?'good':'名字不能为空'}</p>
            <div className={style.input}>
                  <input id={style.name} value={name} name="name" type="text" onChange={
                    (e)=>{
                      changeName(e.target.value.trim());
                    }
                  }/>
            </div>
            <p className={style.content_title}>你的邮箱</p>
              <p className={`${style.check} ${style.check_email}
                ${Strategies.isEmpty(email)?(Strategies.isEmail(email)?style.pass:''):''}
              `} >
                {Strategies.isEmpty(email)?(Strategies.isEmail(email)?'good':'邮箱格式错误'):'邮箱不能为空'}
              </p>
            <div className={style.input}>
                  <input id={style.email} name="email" type="email" value={email} onChange={
                    (e)=>{
                      changeEmail(e.target.value.trim());
                    }
                  }/>
              </div>
              <p className={style.content_title}>打开时间(例如 2021-3-24 11:30:30)</p>
              <p className={`${style.check} ${style.check_time} 
                ${Strategies.isEmpty(time)?(Strategies.isRightTime(time)?style.pass:''):''}
              `}>
              {Strategies.isEmpty(time)?(Strategies.isRightTime(time)?'good':'时间格式错误'):'时间不能为空'}
              </p>
              <div className={style.input}>
                  <input id={style.open_time} value={time} name="open_time" type="text" 
                  onChange={
                    (e)=>{
                      changeTime(e.target.value.trim());
                    }
                  }/>
                  <span className={style.tip}>打开时间之前，胶囊内容是看不到的。</span>
              </div>
              <p className={style.content_title}><span></span>胶囊内容</p>
              <p className={`${style.check} ${style.check_content}`}></p>
              <textarea id={style.content} className={style.area_content} value={content} name="content"  cols={30} rows={10}
                onChange={
                  (e)=>{
                    changeContent(e.target.value);
                  }
                }
              ></textarea>
              <p><span className={style.tip}>胶囊内容不能超过5000字。</span></p>
              <p className={style.content_title}>未到期提示信息</p>
              <textarea id={style.tip} className={style.area_tip} value={tip} name="tip"  cols={30} rows={10}
                onChange={
                  (e)=>{
                    changeTip(e.target.value);
                  }
                }
              ></textarea>
              <p><span className={style.tip}>在 打开时间 之前打开胶囊，会看到提示信息。</span></p>
          </form>
          <div className={localStore.capsule_color=='red'?style.submit:style.submit_02} onClick={(e)=>{
            addCapsule()
          }}>添加胶囊{localStore.capsule_color}</div>
        </div>
      </div>
    </div>
  )}</Observer>
    
  
}

export default Put;