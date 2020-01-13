import React from "react";
import {connect} from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes  from 'prop-types';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
class CoursesPage extends React.Component {
  
  componentDidMount(){   
    this.props.actions.loadCourses().catch(error=>{
      alert("laoding courses failed"+error);
    });

    this.props.actions.loadAuthors().catch(error=>{
      alert("loading authors failed"+error);
    })
  }

  render() {
    return (
    <>
      <h3>Courses</h3>
    
       <CourseList courses ={this.props.courses} />
       
   </>
    )
  }
}

CoursesPage.propTypes = {
  courses:PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions:PropTypes.object.isRequired
 
};

//destructing synatx
// function mapStateToProps({course}){
//   return {
//     courses
//   };
// }

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors[0].name
              //state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors
  };
}
//this approach would expose all the actions as props
function mapDispatchToProps(dispatch){
  return {
    actions:{
      loadCourses:bindActionCreators(courseActions.loadCourses,dispatch)  ,
      loadAuthors:bindActionCreators(authorActions.loadAuthors,dispatch)  ,

    }
     //   note action creators are called by dispatch
  };
}



export default connect (mapStateToProps,mapDispatchToProps) (CoursesPage);
