import React, { Component } from "react";
import { Slider } from "antd";
import anime from "animejs/lib/anime.es.js";

import styles from "./path.sass";

export default class Name extends Component {
  state = {
    rate: 0,
    h: 0
  };

  swipeDistance = {
    x: 0
  };

  componentDidMount() {
    window.scope = this;
    this.setState({ h: this.wrapEl.offsetHeight });
  }

  handleTouchStart = e => {
    this.startPoint = getPoint(e);
    this.lastPoint = this.startPoint;
  };

  handleTouchMove = e => {
    const curPoint = getPoint(e);
    const diff = curPoint.x - this.lastPoint.x;
    const curDistance = this.swipeDistance.x + diff;
    const maxD = this.state.h / 3;
    if (Math.abs(curDistance) > maxD || curDistance > 0) return;

    this.swipeDistance.x = curDistance;
    window.swipeDistance = this.swipeDistance;
    if (this.swipeDistance.x < 0) {
      this.swipe(-this.swipeDistance.x);
    }

    this.lastPoint = curPoint;
  };

  handleTouchEnd = () => {
    anime({
      targets: this.swipeDistance,
      x: 0,
      easing: "easeOutCubic",
      duration: "400",
      update: e => {
        this.swipe(-this.swipeDistance.x);
      }
    });
  };

  swipe = d => {
    window.requestAnimationFrame(() => {
      const maxD = this.state.h / 3;
      const rate = d < maxD ? d / maxD : 1;
      this.setState({ rate });
    });
  };

  render() {
    const { rate, h } = this.state;
    const w = (h / 4.5) * rate;
    const w1 = ((w * 6) / 5);

    return (
      <>
        <div
          className={styles["box"]}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchEnd}
          ref={ref => (this.wrapEl = ref)}
        >
          <svg viewBox={`0 0 ${w} ${h}`} style={{ width: w + "px" }}>
            <path d={`M ${w1} 0 Q -${w1} ${h / 2} ${w1} ${h}`} fill="#ccc" />

            <text x={15 + w / 10} y={h / 2} fill="#666">
              {rate < 0.7 ? "查看更多" : "释放查看"}
            </text>
          </svg>
        </div>
        <Slider
          step={0.5}
          value={rate * 100}
          onChange={rate => this.setState({ rate })}
        />
      </>
    );
  }
}

export function getPoint(e) {
  return {
    x: e.touches ? e.touches[0].pageX : e.clientX,
    y: e.touches ? e.touches[0].pageY : e.clientY
  };
}

/* 阻止浏览器默认滚动事件 */
export function preventDefault(e) {
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
}
