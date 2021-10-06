import React from "react";
import axios from "axios";

export class ButtonForGraphql extends React.Component {
    constructor(props) {
        super(props);
    };

    changePraiseNumHandle = () => {
        axios({
            method: 'post',
            url: '/api',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                query: 'mutations{praiseNum(id: 3)}'
            },
            proxy: {
                host: '127.0.0.1',
                port: 3000,
            },
        }).then((res) => {
            console.log(res);
        });
    };

    render() {
        return <div>
            <button
             onClick={this.changePraiseNumHandle}
             >
                 点赞
            </button>
            <p className='graphql-remark'>【让字段praiseNum自增】</p>
        </div>
    }
}