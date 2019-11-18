import React, { PureComponent } from "react";
import { Table, Button, Input, Row, Col, InputNumber } from "antd";

export default class Home extends PureComponent {
  state = {
    dataSource: [
    ]
  };

  add = (key) => () => {
    const { dataSource } = this.state
    dataSource.map((item) => {
      const res = {...item}
      // if item[key]
    })
  }

  columns = [
    {
      title: "总计",
      dataIndex: "total"
    },
    {
      title: (
        <>
          A <Add onClick={this.add('a')} />
        </>
      ),
      dataIndex: "a",
      render: ({ a: { ref } = {} }) => {
        return ref && <Item ref={ref} />;
      }
    },
    {
      title: (
        <>
          B <Add />
        </>
      ),
      dataIndex: "b",
      render: ({ a: { ref } = {} }) => {
        return ref && <Item ref={ref} />;
      }
    },
    {
      title: (
        <>
          C <Add />
        </>
      ),
      dataIndex: "c",
      render: ({ a: { ref } = {} }) => {
        return ref && <Item ref={ref} />;
      }
    }
  ];

  render() {
    const { dataSource } = this.state;

    return (
      <>
        <Table
          dataSource={dataSource}
          columns={this.columns}
          pagination={false}
        />
      </>
    );
  }
}

function Add(props) {
  return (
    <Button size="small" style={{ marginLeft: "5px" }} {...props}>
      添加
    </Button>
  );
}

function Item({ ref }) {
  return (
    <Row gutter={10}>
      <Col span={12}>
        <Input placeholder="label" ref={ref => this[`${ref}_label`]} />
      </Col>
      <Col span={12}>
        <InputNumber
          ref={ref => this[`${ref}_content`]}
          style={{ width: "100%" }}
          placeholder="content"
          min={0}
        />
      </Col>
    </Row>
  );
}
