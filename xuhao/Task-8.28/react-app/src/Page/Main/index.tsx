import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import style from './index.module.less'
import img_capsule from '../../assets/imgs/1.png'


function Main(){
    return (
      <div className={style.container}>
        <div className={style.container_top}>
          <img className={style.top_img} src={img_capsule} alt=""/>
          <h1 className={style.top_title}>时间胶囊</h1>
        </div>
        <div className={style.container_middle}>
          <div className={style.btn}>
            <p className={style.btn_title}><a className={style.link} href="/put">Put</a></p>
            <p className={style.btn_text}>添加</p>
          </div>
          <div className={style.btn}>
            <p className={style.btn_title}><a className={style.link} href="/open">Open</a></p>
            <p className={style.btn_text}>打开</p>
          </div>
        </div>
        <div className={style.container_bottom}>
          <p className={style.bottom_text}>
              <a href="">什么是时间胶囊？</a>
              <span>·</span>
              <a href="">回胶囊日记</a>
          </p>
        </div>
      </div>
    )
}

export default Main;