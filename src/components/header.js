import React from "react";


export default class Header extends React.Component {
    constructor(props) {
        super ( props );

        this.state = {
            items : [
                { href : "#" , text : "link 1" } ,
                { href : "#" , text : "link 2" } ,
                { href : "#" , text : "link 3" }
                ]
        };
    }
renderItems(){
        let itemsInHeader=[];

        if(this.state && this.state.items){
            this.state.items.forEach((item)=>{
                itemsInHeader.push(<a key={item.text+"-header-item"} href={item.href}>{item.text}</a>)
            })
        }

        return itemsInHeader;
}
    render() {
        return (
            <div>
                {this.renderItems()}
            </div>


        )
    }
}