import React from "react";
import {connect} from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes  from 'prop-types';
import {bindActionCreators} from 'redux';
class CoursesPage extends React.Component {
  // constructor(props){
  //   super(props);
  

  // this.state = {
  //   course:{
  //     title :""
  //   }
  // };
  

  state = {
    course:{
      title :""     
    }
 };



// handelChange(event){
//   const course = {...this.state.course,title:event.target.value}; //values on the right override those on the left
//   this.setState({course:course});
// }

//this is more modern it allows you to take out the constructor and this keyword
handelChange= event =>{
  const course = {...this.state.course,title:event.target.value}; //values on the right override those on the left
  //console.log(event.target.value);
  this.setState({course:course}); // using the object shorthand syntax it becomes this.setState({course}); 
  
};

handleSubmit = event =>{
  event.preventDefault();
  //alert(this.state.course.title);  
  this.props.actions.createCourse(this.state.course);
};
  
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <h3>Add course</h3>
      <input type = "text" onChange={this.handelChange} value={this.state.course.title}/>
        <input type="submit" value="Save"/>
       
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
    </form>
    )
  }
}

CoursesPage.propTypes = {
  courses:PropTypes.array.isRequired,
  actions:PropTypes.object.isRequired
    
};

//destructing synatx
// function mapStateToProps({course}){
//   return {
//     courses
//   };
// }

function mapStateToProps(state){
     return {
       courses:state.courses
     };
}

//this approach would expose all the actions as props
function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(courseActions,dispatch)  
     //   note action creators are called by dispatch
  };
}



export default connect (mapStateToProps,mapDispatchToProps) (CoursesPage);
