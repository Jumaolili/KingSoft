import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './style.less'
import capsule from '../../assets/imgs/1.png'

interface State{
  name?:string,
  email?:string,
  time?:string,
  content?:string,
  tip?:string
}

//判断策略
let Strategies={
  isEmail:function(value:string){
      if(!/[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/.test(value)){
          return false;
      }
      return true;
  },  
  isEmpty:function(value:string){
      if(value===''){
          return false;
      }
      return true;
  },
  isMore:function(value:string){
      if(value.length>5000){
          return false;
      }
      return true;
  },
  isRightTime:function(value:string){
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



export default class Put extends React.Component<State> {
  state:State={
    name:'',
    email:'',
    time:'',
    content:'',
    tip:''
  }
  changeName(value:string){
    this.setState({
      name:value
    });
  }
  changeEmail(value:string){
    this.setState({
      email:value
    });
  }
  changeTime(value:string){
    this.setState({
      time:value
    });
  }
  changeContent(value:string){
    this.setState({
      content:value
    });
  }
  changeTip(value:string){
    this.setState({
      tip:value
    });
  }
  addCapsule(){
    let _this=this;
    //进行检测
    if(Strategies.isEmpty(this.state.name)&&
    Strategies.isEmpty(this.state.email)&&
    Strategies.isEmail(this.state.email)&&
    Strategies.isEmpty(this.state.time)&&
    Strategies.isRightTime(this.state.time)&&
    Strategies.isMore(this.state.content)){
      //集结数据
      let form={
        name:this.state.name,
        email:this.state.email,
        tip:this.state.tip,
        time:this.state.time,
        content:this.state.content
      }
      console.log(form)
      //提交信息
      fetch('http://127.0.0.1:3280/api/add',{
        method: 'POST', // or 'PUT'
        body: JSON.stringify(form), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
      .then((res)=>{
          _this.init();
          return res.json();
      })
      .then(response => {
        alert('Success:'+ response.id);
        console.log(response.id);
      })  
      .catch(error => console.error('Error:', error))
    }else{
      alert('表单信息格式错误或者字数超过5000')
    }
  }
  init(){
    this.setState({
      name:'',
      email:'',
      time:'',
      content:'',
      tip:''
    })
  }
  render() {
    let _this=this;
    return (
      <div>
        <div className={style.page_container}>
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
              <h1>添加胶囊</h1>
              <p className={style.content_title}>你的名字</p>
              <p className={`${style.check} ${style.check_name} ${Strategies.isEmpty(_this.state.name)?style.pass:''}`}>{Strategies.isEmpty(_this.state.name)?'good':'名字不能为空'}</p>
              <div className={style.input}>
                    <input id={style.name} value={_this.state.name} name="name" type="text" onChange={
                      (e)=>{
                        _this.changeName(e.target.value.trim());
                      }
                    }/>
              </div>
              <p className={style.content_title}>你的邮箱</p>
                <p className={`${style.check} ${style.check_email}
                  ${Strategies.isEmpty(_this.state.email)?(Strategies.isEmail(_this.state.email)?style.pass:''):''}
                `} >
                  {Strategies.isEmpty(_this.state.email)?(Strategies.isEmail(_this.state.email)?'good':'邮箱格式错误'):'邮箱不能为空'}
                </p>
              <div className={style.input}>
                    <input id={style.email} name="email" type="email" value={_this.state.email} onChange={
                      (e)=>{
                        _this.changeEmail(e.target.value.trim());
                      }
                    }/>
                </div>
                <p className={style.content_title}>打开时间(例如 2021-3-24 11:30:30)</p>
                <p className={`${style.check} ${style.check_time} 
                  ${Strategies.isEmpty(_this.state.time)?(Strategies.isRightTime(_this.state.time)?style.pass:''):''}
                `}>
                {Strategies.isEmpty(_this.state.time)?(Strategies.isRightTime(_this.state.time)?'good':'时间格式错误'):'时间不能为空'}
                </p>
                <div className={style.input}>
                    <input id={style.open_time} value={_this.state.time} name="open_time" type="text" 
                    onChange={
                      (e)=>{
                        _this.changeTime(e.target.value.trim());
                      }
                    }/>
                    <span className={style.tip}>打开时间之前，胶囊内容是看不到的。</span>
                </div>
                <p className={style.content_title}><span></span>胶囊内容</p>
                <p className={`${style.check} ${style.check_content}`}></p>
                <textarea id={style.content} className={style.area_content} value={_this.state.content} name="content"  cols={30} rows={10}
                  onChange={
                    (e)=>{
                      _this.changeContent(e.target.value);
                    }
                  }
                ></textarea>
                <p><span className={style.tip}>胶囊内容不能超过5000字。</span></p>
                <p className={style.content_title}>未到期提示信息</p>
                <textarea id={style.tip} className={style.area_tip} value={_this.state.tip} name="tip"  cols={30} rows={10}
                  onChange={
                    (e)=>{
                      _this.changeTip(e.target.value);
                    }
                  }
                ></textarea>
                <p><span className={style.tip}>在 打开时间 之前打开胶囊，会看到提示信息。</span></p>
            </form>
            <div className={style.submit} onClick={(e)=>{
              _this.addCapsule()
            }}>添加胶囊</div>
          </div>
        </div>
      </div>
    )
  }

}