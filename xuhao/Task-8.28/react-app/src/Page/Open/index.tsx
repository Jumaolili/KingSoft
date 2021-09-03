import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './style.module.less'
import img_capsule from '../../assets/imgs/1.png'
import Capsule from '../../components/Capsule'
import Cookie from 'react-cookies'


function Open(){
  const [capsule,setCapsule]=React.useState([{}]);
  const [inputKey,setInputKey]=React.useState('');
  const [color,setColor]=React.useState('red');

  function changeColor(){
    if(Cookie.load('bar_color')&&Cookie.load('bar_color')=='red'){
      Cookie.save('bar_color','skyblue',{path:'/'});
    }else{
      Cookie.save('bar_color','red',{path:'/'});
    }
    setColor(Cookie.load('bar_color'))
  }
  function switchTime(time:string):number{
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
  function getData(){
    //console.log(key);
    let form={
      id:inputKey
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
      let data:object={
        seconds:switchTime(response.time),
        count:switchTime(response.time),
        name:response.name,
        email:response.email,
        time:response.time,
        content:response.content,
        tip:response.tip
      };
      let testCopy:object[] = [].concat(JSON.parse(JSON.stringify(capsule)));
      testCopy.push(data)
      //console.log(_this.state.capsules)
      setCapsule(testCopy);
    })
    .catch(error => console.error('Error:', error))
  }
  function init(){
    setInputKey('')
  }

  React.useEffect(() => {
    init()
    console.log(capsule)
  }, [capsule])

  React.useEffect(() => {
    if(Cookie.load('bar_color')){
      setColor(Cookie.load('bar_color'))
    }
  }, [])
  return (
    <>
      <div className={style.container}>
        <div className={style.top}>
            <div className={style.top_icon}>
                {/* <img className={style.icon} src={img_capsule} alt=""/> */}
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
            changeColor();
          }}>
                回胶囊日记
            </span>
        </div>
        <div className={style.content}>
            <form className={style.content_form} action="">
                <h1>打开胶囊</h1>
                <div className={style.input}>
                    <label>胶囊key：</label>
                    <input id={style.putKey} type="text" value={inputKey} onChange={
                        (e)=>{
                          setInputKey(e.target.value)
                        }
                      } /> 
                    <span id={style.open} className={(color=='red')?style.open_key:style.open_key_02} onClick={
                      (e)=>{
                        getData();
                      }
                    }>打开胶囊</span>
                </div>
            </form>
            <div className={style.opened_content}>
                {
                  capsule.map((item:any)=>{

                      if(Object.keys(item).length==0){
                        return ''
                      }
                      return <Capsule key={item.seconds} data={item}/>
                    
                    
                  })
                }
            </div>
        </div>
      </div>
    </>
  )
}

export default Open;