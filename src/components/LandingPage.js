import React from "react";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="landing-screen" className="column white-text grow-1 padding-30">
        <div className="column center grow-1">
          <h1 className="text-shadow-1 text-center uppercase gigant-text">
            {this.props.data.mainHeader}
          </h1>
          <h2 className="text-shadow-1 text-center large-text">
            {this.props.data.subHeader}
          </h2>
        </div>
        <div className="bg-grey-1 column center padding-20">
          <p className="uppercase anton big-text margin-5 large-text">
            Imagine. Invent. Implement.
          </p>
          <p>
            Copyright by <strong>Oykos Development.</strong>
          </p>
        </div>
      </div>
    );
  }
}
