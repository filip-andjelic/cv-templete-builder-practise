// External dependencies
import React from "react";
import Button from "./button";
import StoredData from "./StoredData";
// Internal dependencies


export default class UserData extends React.Component {
    constructor(props) {
        super ( props );

        this.state = {
            noReferences : 1 ,
            noExperience : 1 ,
            noEducation : 1 ,
            noSkills : 1 ,
            noSocial : 1 ,
            firstName : ['' , 'First Name'] ,
            lastName : ['' , 'Last Name'] ,
            jobTitle : ['' , 'Job Title'] ,
            country : ['' , 'Country'] ,
            city : ['' , 'City'] ,
            street : ['' , 'Street'] ,
            phone : ['' , 'Phone'] ,
            email : ['' , 'Email'] ,
            website : ['' , 'Website'] ,
            social : {} ,
            references : [{
                name : '' ,
                jobTitle : '' ,
                phone : '' ,
                email : ''
            }] ,
            experience : [{
                start : '' ,
                end : '' ,
                company : '' ,
                jobTitle : '' ,
                description : ''
            }] ,
            education : [{
                start : '' ,
                end : '' ,
                school : '' ,
                degree : '' ,
                description : ''
            }] ,
            skills : [{
                name : '' ,
                percent : ''
            }]
        };

        this.changeInputInfo = this.changeInputInfo.bind ( this );
        this.renderReferencesInput = this.renderReferencesInput.bind ( this );
        this.updateReferences = this.updateReferences.bind ( this );
        this.addReference = this.addReference.bind ( this );
        this.addSocial = this.addSocial.bind ( this );
        this.removeReference = this.removeReference.bind ( this );
        this.updateSocial = this.updateSocial.bind ( this );
        this.updateSocialState = this.updateSocialState.bind ( this );

    }

    changeInputInfo(e) {
        let value = e.target.value;
        let state = e.target.getAttribute ( 'data-prop' );
        let placeholder = e.target.getAttribute ( 'data-label' );
        this.setState (
            { [state] : [value , placeholder] }
        );
    }

    references = [];
    experience = [];
    education = [];
    skills = [];
    social = [];
    name;
    url;

    updateSocial(e) {
        if (e.target.getAttribute ( 'data-name' ) === "name") {
            this.name = e.target.value;
        }
        if (e.target.getAttribute ( 'data-name' ) === "url") {
            this.url = e.target.value;
        }
        let order = e.target.getAttribute ( 'data-order' );
        let networkInstance = {};
        networkInstance[this.name] = {};
        networkInstance[this.name].name = this.name;
        networkInstance[this.name].url = this.url;
        if (this.state.noSocial<=order) {
            this.social.push ( networkInstance );
        } else {
            this.social[order] = networkInstance;
        }

    }

    updateSocialState() {
        let object = {};
        for (let i = 0; i<this.social.length; i++) {
            for (let name in this.social[i]) {
                if (this.social[i].hasOwnProperty ( name )) {
                    let netName = this.social[i][name].name;
                    object[netName] = this.social[i][name];
                    object[netName] = this.social[i][name]
                }
            }
        }
        this.setState (
            { social : object }
        );
    }

    addSocial() {
        this.setState (
            { noSocial : this.state.noSocial + 1 }
        )
    }

    updateReferences(e , section) {
        let value = e.target.value;
        let item = e.target.getAttribute ( 'data-name' );
        let order = e.target.getAttribute ( 'data-order' );
        let singleReference;
        switch (section) {
            case "references" :
                singleReference = {
                    name : '' ,
                    jobTitle : '' ,
                    phone : '' ,
                    email : ''
                };
                break;
            case "experience" :
                singleReference = {
                    start : '' ,
                    end : '' ,
                    company : '' ,
                    jobTitle : '' ,
                    description : ''
                };
                break;
            case "education" :
                singleReference = {
                    start : '' ,
                    end : '' ,
                    school : '' ,
                    degree : '' ,
                    description : ''
                };
                break;
            case "skills" :
                singleReference = {
                    name : '' ,
                    percent : ''
                };
                break;
        }

        if ((this[section]).length<=order) {
            this[section].push ( singleReference );
        }
        this[section][order][item] = value;
        this.setState ( {
            [section] : this[section]
        } )
    }

    addReference(state) {
        let counter;
        switch (state) {
            case "references" :
                counter = "noReferences";
                break;
            case "experience" :
                counter = "noExperience";
                break;
            case "education" :
                counter = "noEducation";
                break;
            case "skills" :
                counter = "noSkills";
                break;
        }
        let number = this.state[counter];
        let references = this.state[state];
        if (number>references.length || (this[state]).length === 0) {
            return
        }
        this.setState ( {
            [counter] : number + 1
        } );
    }

    removeReference() {
        let number = this.state.noReferences;
        let references = this.state.references;
        this.setState ( {
            references : references
        } );
        this.setState ( {
            noReferences : number - 1
        } )
    }

    renderSocialInput = () => {
        let buttonStyle = {
            position : "relative" ,
            display : "flex" ,
            flexDirection : "column" ,
            justifyContent : "center"
        };
        let divStyle = { position : "relative" };
        let socialElements = [];
        for (let i = 0; i<this.state.noSocial; i++) {
            let nameValue;
            let urlValue;
            for (let item in this.social[i]) {
                if (this.social[i].hasOwnProperty ( item )) {
                    nameValue = this.social[i][item].name;
                    urlValue = this.social[i][item].url
                }
            }
            socialElements.push (
                <div className="flex">
                    <div style={divStyle}>
                        <input
                            type="text"
                            defaultValue={nameValue}
                            className="normal-text bg-grey-2 input margin-20"
                            key={Math.random ()}
                            data-name={"name"}
                            data-order={i}
                            onChange={this.updateSocial}
                            required={true}

                        />
                        <span className="floating-label">Social Network</span>
                    </div>
                    <div style={divStyle}>
                        <input
                            type="text"
                            defaultValue={urlValue}
                            className="normal-text bg-grey-2 input margin-20"
                            key={Math.random ()}
                            data-name={"url"}
                            data-order={i}
                            onChange={this.updateSocial}
                            onBlur={this.updateSocialState}
                            required={true}

                        />
                        <span key={Math.random ()} className="floating-label">{"account URL"}</span>
                    </div>
                </div>
            )
        }
        socialElements.push ( <div style={buttonStyle}><Button key={"add-reference" + Math.random ()} text="+"
                                                               handleClick={() => this.addSocial ()}/>
        </div> );
        return socialElements;
    };
    renderReferencesInput = (item , style , counter) => {
        let divStyle = { position : "relative" };
        let buttonStyle = {
            position : "relative" ,
            display : "flex" ,
            flexDirection : "column" ,
            justifyContent : "center"
        };
        let taDivStyle = { position : "relative" , flexGrow : 1 , paddingRight : "30px" };
        let textareaStyle = { height : "90px" , width : "-webkit-fill-available" };
        let referencesInputElements = [];
        for (let i = 0; i<this.state[counter]; i++) {
            switch (item) {
                case "references" :
                    referencesInputElements.push (
                        <h3 key={"references-sub-" + i} style={style} className="margin-20">Reference #{i + 1}</h3>
                    );
                    break;
                case "experience" :
                    referencesInputElements.push (
                        <h3 key={"references-sub-" + i} style={style} className="margin-20">Experience #{i + 1}</h3>
                    );
                    break;
                case "education" :
                    referencesInputElements.push (
                        <h3 key={"references-sub-" + i} style={style} className="margin-20">Education #{i + 1}</h3>
                    );
                    break;
                case "skills" :
                    referencesInputElements.push (
                        <h3 key={"references-sub-" + i} style={style} className="margin-20">Skill #{i + 1}</h3>
                    );
                    break;
            }
            let refObject = this.state[item][0];
            for (let subItem in refObject) {
                if (refObject.hasOwnProperty ( subItem )) {

                    let placeholder = subItem;
                    if (subItem === "jobTitle") {
                        placeholder = "Job Title"
                    }
                    if (subItem === 'description') {
                        referencesInputElements.push (
                            <div style={taDivStyle}>
                                <textarea
                                    style={textareaStyle}
                                    className="normal-text bg-grey-2 input margin-20"
                                    key={item + "-" + subItem + "key" + "-" + i}
                                    data-check={item}
                                    data-name={subItem}
                                    data-order={i}
                                    onChange={(e) => this.updateReferences ( e , item )}
                                    required={true}

                                />
                                <span key={Math.random ()} className="floating-label">{placeholder}</span>
                            </div>
                        )
                    } else {
                        referencesInputElements.push (
                            <div style={divStyle}>
                                <input
                                    type="text"
                                    className="normal-text bg-grey-2 input margin-20"
                                    key={item + "-" + subItem + "key" + "-" + i + "-textarea"}
                                    data-check={item}
                                    data-name={subItem}
                                    data-order={i}
                                    onChange={(e) => this.updateReferences ( e , item )}
                                    required={true}

                                />
                                <span key={Math.random ()} className="floating-label">{placeholder}</span>
                            </div>
                        )
                    }

                }
            }
        }
        referencesInputElements.push ( <div style={buttonStyle}><Button key={"add-reference" + Math.random ()} text="+"
                                                                        handleClick={() => this.addReference ( item )}/>
        </div> );
        referencesInputElements.push ( <div style={buttonStyle}><Button key={"remove-reference" + Math.random ()}
                                                                        text="-"
                                                                        handleClick={this.removeReference}/></div> );
        return referencesInputElements;
    };
    data = this.state;

    render() {
        let divStyle = { position : "relative" };
        let style = { display : "block" , color : "white" , width : "100%" };
        let infoObject = this.state;
        let infoInputs = [];
        for (let item in infoObject) {
            if (infoObject.hasOwnProperty ( item )) {
                switch (item) {
                    case "noReferences" :
                        continue;
                    case "noExperience" :
                        continue;
                    case "noEducation" :
                        continue;
                    case "noSkills" :
                        continue;
                    case "noSocial" :
                        continue;
                    case "firstName" :
                        infoInputs.push ( <h2 key={item + "heading"} style={style} className="margin-20">General
                            Info</h2> );
                        break;
                    case "facebook" :
                        infoInputs.push ( <h2 key={item + "heading"} style={style} className="margin-20">Social</h2> );
                        break;
                    case "references" :
                        infoInputs.push ( <h2 key={item + "heading"} style={style}
                                              className="margin-20">References</h2> );
                        infoInputs.push ( this.renderReferencesInput ( item , style , "noReferences" ) );
                        continue;
                    case "experience" :
                        infoInputs.push ( <h2 key={item + "heading"} style={style}
                                              className="margin-20">Experience</h2> );
                        infoInputs.push ( this.renderReferencesInput ( item , style , "noExperience" ) );
                        continue;
                    case "education" :
                        infoInputs.push ( <h2 key={item + "heading"} style={style}
                                              className="margin-20">Education</h2> );
                        infoInputs.push ( this.renderReferencesInput ( item , style , "noEducation" ) );
                        continue;
                    case "skills" :
                        infoInputs.push ( <h2 key={item + "heading"} style={style}
                                              className="margin-20">Skills</h2> );
                        infoInputs.push ( this.renderReferencesInput ( item , style , "noSkills" ) );
                        continue;
                    case "social" :
                        infoInputs.push ( <h2 key={item + "heading"} style={style}
                                              className="margin-20">Social</h2> );
                        infoInputs.push ( this.renderSocialInput () );
                        continue;

                }
                infoInputs.push (
                    <div style={divStyle}>
                        <input
                            type="text"
                            data-label={infoObject[item][1]}
                            data-state={item}
                            className="normal-text bg-grey-2 input margin-20"
                            key={item + "key"}
                            data-prop={item}
                            onChange={this.changeInputInfo}
                            required={true}

                        />
                        <span key={Math.random ()} className="floating-label">{infoObject[item][1]}</span>
                    </div>
                )
            }
        }

        return (
            <div className="flex wrap">
                {infoInputs}
                <StoredData data={this.data}/>
            </div>

        )
    }
};