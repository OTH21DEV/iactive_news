// import { React, Component,memo } from "react";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import icon_star from "../../assets/icon_star.png";

// class StarState extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { clicked: false };

//     // this.handleClick = this.handleClick.bind(this);
//     //   this.render()
//   }
//   componentWillMount() {

//       this.setState({
//           clicked: !this.state.clicked,
//         });
//   }

// //   handleClick() {
// //     this.setState({
// //       clicked: !this.state.clicked,
// //     });
// //   }
//   render() {
//     let clicked = this.state.clicked;

//     return <div onClick={this.componentWillMount}>{this.state.clicked ? <img src={icon_star} alt="Icon favorite" /> : <FontAwesomeIcon icon={faStar} />}</div>;
//   }
// }

// class StarState extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { clicked: false };

//     // this.handleClick = this.handleClick.bind(this);
//     //   this.render()
//   }
//   getState(){
//     return this.state
//   }

//   async handleClick() {
//     this.setState({
//         ...this.getState(),
//       clicked: true,
//     });
//   }



// }
class StarState extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { clicked: false };
        this.componentIsMounted = false;
        this.handleClick = this.handleClick.bind(this);
      }
    
      componentDidMount() {
        this.componentIsMounted = true;
      }
    
      componentWillUnmount() {
        this.componentIsMounted = false;
      }
    
     async handleClick() {
        const { clicked } = this.state;
    
        if (this.componentIsMounted) {
          this.setState({
            clicked: !clicked,
          });
        }
      }
    
    //   render() {
    //     const { clicked } = this.state;
    
    //     return (
    //       <div onClick={this.handleClick}>
    //         {clicked ? (
    //           <img src={icon_star} alt="Icon favorite" />
    //         ) : (
    //           <span>
    //             <FontAwesomeIcon icon={faStar} />
    //           </span>
    //         )}
    //       </div>
    //     );
    //   }
    }
  
  
  
export default StarState;
