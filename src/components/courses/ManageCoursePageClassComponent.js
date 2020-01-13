import React from "react";
import {connect} from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes  from 'prop-types';


class ManageCoursePage extends React.Component {
  
  componentDidMount(){
    
    const {courses,authors,loadAuthors,loadCourses} = this.props;
    loadCourses().catch(error=>{
      alert("laoding courses failed"+error);
    });

    loadAuthors().catch(error=>{
      alert("laoding authors failed"+error);
    })
  }

  render() {
    return (
    <>
      <h3>Manage Course</h3>
    
       
       
   </>
    )
  }
}

ManageCoursePage.propTypes = {
  courses:PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors:PropTypes.func.isRequired,
  loadCourses:PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors :state.authors 
  };
}
//this approach would expose all the actions as props
// function mapDispatchToProps(dispatch){
//   return {
//     actions:{
//       loadCourses:bindActionCreators(courseActions.loadCourses,dispatch)  ,
//       loadAuthors:bindActionCreators(authorActions.loadAuthors,dispatch)  ,

//     }
//      //   note action creators are called by dispatch
//   };
// }


//declaring mapDispatchToProps as an Object
const  mapDispatchToProps = {
 
        loadCourses:courseActions.loadCourses,
        loadAuthors:authorActions.loadAuthors
  
      } ;
       


export default connect (mapStateToProps,mapDispatchToProps) (ManageCoursePage);
