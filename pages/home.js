import React, { PureComponent } from "react";
import { Table, Button, Icon, Input, Row, Col, InputNumber } from "antd";

import styles from "./home.css";

export default class Home extends PureComponent {
  state = {
    a: [], // [{ label: '', value: null }]
    b: []
  };

  handleChangeA = (isLabel, index, value) => {
    const { a } = this.state;
    const _a = [...a];
    _a[index][isLabel ? "label" : "value"] = value;
    this.setState({ a: _a });
  };

  addA = () => {
    const { a } = this.state;
    this.setState({ a: [...a, { label: "", value: 0 }] });
  };

  render() {
    window.scope = this;
    const { a } = this.state;

    return (
      <>
        <table border="1px solid #666" className={styles["table-wrapper"]}>
          <tr>
            <th rowSpan="2" align="center" className={styles["nowrap"]}>
              BKK-A
            </th>
            <th className={styles["nowrap"]}>面料成本</th>
            <th className={styles["nowrap"]}>中转费、派费成本</th>
          </tr>
          <tr>
            <td style={{ padding: 0 }}>
              <Line left="面料类型" right="数量" />
              {a.map(({ label, value }, index) => (
                <Line
                  key={index}
                  left={
                    <Input
                      placeholder="label"
                      value={label}
                      onChange={event =>
                        this.handleChangeA(true, index, event.target.value)
                      }
                    />
                  }
                  right={
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="content"
                      min={0}
                      value={value}
                      onChange={value =>
                        this.handleChangeA(false, index, value)
                      }
                    />
                  }
                />
              ))}
              <Add onClick={this.addA} />
            </td>
            <td>33</td>
          </tr>
        </table>
      </>
    );
  }
}

function Add(props) {
  return (
    <div className={styles["add-btn"]} {...props}>
      <Icon type="plus" />
    </div>
  );
}

function Item({ ref }) {
  return (
    <Line
      left={<Input placeholder="label" ref={ref => this[`${ref}_label`]} />}
      right={
        <InputNumber
          ref={ref => this[`${ref}_content`]}
          style={{ width: "100%" }}
          placeholder="content"
          min={0}
        />
      }
    />
  );
}

function Line({ left, right }) {
  return (
    <Row className={styles["line"]}>
      <Col span={12}>
        <div className={styles["left"]}>{left}</div>
      </Col>
      <Col span={12}>
        <div className={styles["right"]}>{right}</div>
      </Col>
    </Row>
  );
}
