import React from "react";
import "../style/tooltip.css";

export default class TooltipWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const widthClass = this.props.tooltip ? 'w-100-perc opacity-1' : 'w-0 opacity-0';
        const caretColor = 'border-' + this.props.position + '-' + this.props.type;
        const caretClasses =
            'caret-wrapper table padding-10 margin-l-min-5 transition-0-5-s absolute '
            + this.props.position + ' ' + widthClass + ' ' + caretColor;
        const classes =
            'tooltip text-center transition-0-5-s bg-' + this.props.type;

        return (<div className="tooltip-wrapper relative column justify-center">
            {
                !!this.props.content && (<div
                    onMouseEnter={() => this.props.hideTooltip()}
                >
                    {this.props.content}
                </div>)
            }
            {
                <div className={caretClasses}>
                    <div className={classes}>
                        {this.props.tooltip}
                    </div>
                </div>
            }
        </div>);
    }
};