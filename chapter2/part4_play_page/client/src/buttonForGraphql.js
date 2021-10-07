import React from "react";

export class ButtonForGraphql extends React.Component {
    constructor(props) {
        super(props);
    };

    changePraiseNumHandle = () => {

        fetch("./api", {
            method: "POST",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              "query": "mutation { praise(id: 1) }"
            })
          }).then(res => res.json())
            .then(res => {
             console.log(res)
            })
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