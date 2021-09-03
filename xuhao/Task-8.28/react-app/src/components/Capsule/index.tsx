import * as React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import style from './style.less'


// interface State{
//     name?:string,
//     email?:string,
//     time?:string,
//     content?:string,
//     tip?:string,
//     seconds?:Number,
//     timer?:any,
//     count?:number
// }

interface Props{
    data?:any
}

// interface Data{
//     name:string,
//     email:string,
//     time:string,
//     content:string,
//     tip:string,
// }

const Capsule:React.FC<Props>=(props)=>{
    const {data}=props;

    // state:any={
    //     name:this.props.data.name,
    //     email:this.props.data.email,
    //     time:this.props.data.time,
    //     content:this.props.data.content,
    //     tip:this.props.data.tip,
    //     seconds:this.props.data.seconds,
    //     count:this.props.data.count>new Date().getTime()
    //           ?
    //           Math.floor((this.props.data.count-new Date().getTime())/1000)
    //           :
    //           0,
    //     timer:null
    // }
    const [name,setName]=React.useState(data.name);
    const [email,setEmail]=React.useState(data.email);
    const [time,setTime]=React.useState(data.time);
    const [content,setContent]=React.useState(data.content);
    const [tip,setTip]=React.useState(data.tip);
    const [seconds,setSeconds]=React.useState(data.seconds);
    const [count,setCount]=React.useState(data.count>new Date().getTime()
                                            ?
                                            Math.floor((data.count-new Date().getTime())/1000)
                                            :
                                            0);
    const [timer,setTimer]=React.useState(null);

    React.useEffect(() => {
        const timer= setInterval(
            () => {
                
                if(count>0){
                    //console.log(1)
                    let tick=count-1;
                    setCount((count)=>count-1)
                }else{
                    clearInterval();
                    setTimer(null);
                }
                
            },
            1000
        )
    }, [])

    
    //console.log(this.props.data.count)
    return(
        <div className={style.capsule}>
            <p className={style.capsule_title}><span className={style.title_name}>【{name}】</span>在<span className={style.title_time}>【{time}】</span>写下的时间胶囊</p>
            <p className={style.capsule_content}>{(new Date().getTime()>seconds)?content:`还没到时间，距离可以开启还有${count}秒`}</p>
        </div>
    )
    
}

export default Capsule;