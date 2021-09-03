import * as React from 'react'
import capsule from '../../assets/imgs/1.png'
import { RouteComponentProps, Link } from 'react-router-dom'
import './style.css'

export default class Main extends React.Component<RouteComponentProps> {

  render() {
    return (
      <div className="container">
        <div className="container-top">
          <img className="top-img" src={capsule} alt=""/>
          <h1 classNametop-title>时间胶囊</h1>
        </div>
        <div className="container-middle">
          <div className="btn">
            <p className="btn-title"><Link className="link" to="/put">Put</Link></p>
            <p className="btn-text">添加</p>
          </div>
          <div className="btn">
            <p className="btn-title"><Link className="link" to="/open">Open</Link></p>
            <p className="btn-text">打开</p>
          </div>
        </div>
        <div className="container-bottom">
          <p className="bottom-text">
              <a href="">什么是时间胶囊？</a>
              <span>·</span>
              <a href="">回胶囊日记</a>
          </p>
        </div>
      </div>
    )
  }

}