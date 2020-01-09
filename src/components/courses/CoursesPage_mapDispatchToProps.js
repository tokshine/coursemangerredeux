import React from "react";
import {connect} from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes  from 'prop-types';

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
  this.props.createCourse(this.state.course);
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
  createCourse:PropTypes.func.isRequired
    
};

function mapStateToProps(state){
     return {
       courses:state.courses
     };
}

//this quite verbose ,you could  replace bindActionCreators from redux
function mapDispatchToProps(dispatch){
  return {
    createCourse:course => dispatch(courseActions.createCourse(course))    
     //   note action creators are called by dispatch
  }
}



export default connect (mapStateToProps,mapDispatchToProps) (CoursesPage);
