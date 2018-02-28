import React from "react";
import {
  View
} from "react-native";
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { postJob } from '../../services/jobService';
import { searchBusiness } from '../../services/businessService';
import { toastShow } from '../../services/toastService';
import WizardJobForm from '../../components/wizards/WizardJobForm';
import { tradieFinder } from '../../actions/actionCreator';



export class CreateJobScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      isVisible:false
    }
  }

  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    this.setState({isVisible:true});
    
    return postJob(values)
    .then(job => {
      
      dispatch(reset('WizardJobForm'));

      let businessQuery = {
        categoryId: job.businessCategoryId,
        latitude: job.location.latitude,
        longitude: job.location.longitude,
        take: 5
      };
      searchBusiness(businessQuery, job.id)
      .then(businessList => {

       // navigation.navigate("TradieFinder");
        this.props.tradieFinder({jobId:job.id,businessList:businessList});

        toastShow("Search available tradies  Successfully", "success", 3000); 
      }).catch(err => {
        toastShow("Search available tradies failed, Please try again.", "danger", 3000);   
      });
  
    }).catch( err => {
      toastShow("Post job failed, Please try again.", "danger", 3000);   
    });
}
  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (

        <WizardJobForm wizardLabel='WizardJobForm' onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
     
    );
  }
}

const mapStateToProps = (state, props) =>{
  return{
    // page : state.page,
    // form: props.wizardLabel
  };
}

const mapDispatchToProps = {
  tradieFinder
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateJobScreen);