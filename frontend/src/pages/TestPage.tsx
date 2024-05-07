import React, { useState } from "react";
import ReactDOM from "react-dom";

import { DatePicker, Button, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";
 

const data = [
    {
        "_id": "5ec527b3334cca5dc66093e3",
        "report": {
            "queueResult": {
                "agent": {
                    "sipUsername": "2205.Peroglio.bria_d",
                    "extension": "2205",
                    "surname": "Peroglio",
                    "name": "Admin"
                },
                "timedOut": false,
                "abandoned": false,
                "inOverflow": false,
                "attendedTransfer": false,
                "blindTransfer": true,
                "served": true
            },
            "callee": {
                "kind": "callcenter",
                "name": "Coda Enry",
                "external": "false",
                "extension": "2227"
            },
            "caller": {
                "external": "true",
                "extension": "0110925340"
            },
            "company": "cloudpbx",
            "lastHop": "2205.Peroglio.bria_d",
            "transferHops": [
                "2227",
                "01119565625",
                "2205.Peroglio.bria_d"
            ],
            "incomingCall": {
                "serviceCalled": true,
                "missed": false,
                "voicemail": false,
                "answered": true
            },
            "fax": false,
            "startEpoch": 1589979056,
            "endEpoch": 1589979056,
            "initEpoch": 1589979038
        }
    },
]
const { RangePicker } = DatePicker;

let date = new Date();
var nowDate = moment(date);
const dateFormatList = ["YYYY/MM/DD", "DD/MM/YYYY"];

const TestPage: React.FC = () => {


    const [dateStart, setDateStart] = useState("")
    const [setDateEnd, dateEnd] = useState("")

    const dataSourceEquivalent = () =>
        data.map(cdr => {
          const { _id: key } = cdr;
          const { caller: callerObj = {} }:any = cdr.report;
          let caller = callerObj.name || callerObj.extension;
          const { callee: calleeObj = {} }:any = cdr.report;
          let callee = calleeObj.name || calleeObj.extension;
          const { startEpoch = 0 } = cdr.report;
          let date = moment(new Date(startEpoch * 1000)).format(
            "YYYY/MM/DD hh:mm.ss"
          );
          const { queueResult = {} }:any = cdr.report;
          const resultValues = [];
          for (let prop in queueResult) {
            if (queueResult[prop] === true) resultValues.push(prop);
          }
          let result = resultValues.join(","); //e.g. "attendedTransfer,served"
          let agent = queueResult.agent
            ? `${queueResult.agent.name} ${queueResult.agent.surname}   ${
                queueResult.agent.extension
              } `
            : "";
          const { endEpoch = 0 } = cdr.report;
          const duration = endEpoch - startEpoch; //in seconds
      
          //caller callee date        result          agent             duration            details
          //caller callee startEpoch  fn(queueResult) fn2(queueResult)  startEpoch-endEpoch (+)
          return {
            key,
            caller,
            callee,
            date,
            result,
            agent,
            duration
          };
        });
const columns = [
  {
    title: "caller",
    dataIndex: "caller",
    key: "caller"
  },
  {
    title: "callee",
    dataIndex: "callee",
    key: "callee"
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "result",
    dataIndex: "result",
    key: "result"
  },
  {
    title: "agent",
    dataIndex: "agent",
    key: "agent"
  },
  {
    title: "duration",
    dataIndex: "duration",
    key: "duration"
  }
];

const runFilterDate = () => {
    console.log(dateStart)
    console.log(setDateEnd)
}

return (
  <div>
    <div className="d-flex">
      <RangePicker
        className="mr-3"
        defaultValue={[
            dayjs(moment(nowDate, dateFormatList[0]).format("YYYY-MM-DD")),
            dayjs(moment(nowDate, dateFormatList[0]).format("YYYY-MM-DD"))
        ]}
        onChange={(e) => {
            setDateStart(dayjs(e[0]).format("YYYY-MM-DD"));
            dateEnd(dayjs(e[1]).format("YYYY-MM-DD"));
        }
        }
        format={dateFormatList}
        size={"large"}
      />
      <Button onClick={e=> runFilterDate()} type="primary" size={"large"} icon={<SearchOutlined />}>
        Search
      </Button>
    </div>
    <hr />
    <Table dataSource={dataSourceEquivalent()} columns={columns} />
  </div>
)
}
export default TestPage;