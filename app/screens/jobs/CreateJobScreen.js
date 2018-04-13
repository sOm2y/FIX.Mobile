import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { postJob } from '../../services/jobService';
import { searchBusiness } from '../../services/businessService';
import { toastShow } from '../../services/toastService';
import WizardJobForm from '../../components/wizards/WizardJobForm';
import { tradieFinder, submitJobDetail } from '../../actions/actionCreator';

export class CreateJobScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: false
    };
  }

  static navigationOptions = ({ navigation }) => ({});

  onSubmit = (values, dispatch, navigation) => {
    const { jobDetail, isJobSubmitted } = this.props;
    this.setState({ isVisible: true });

    // return postJob(values)
  
    dispatch(reset('WizardJobForm'));
    this.props.submitJobDetail(values);

    // .then(job => {

    // }).catch( err => {
    //   toastShow("Post job failed, Please try again.", "danger", 3000);
    // });
  };
  render() {
    const { navigation, jobDetail, isJobSubmitted } = this.props;
    const { navigate } = navigation;

    if (isJobSubmitted) {
      let businessQuery = {
        categoryId: jobDetail.businessCategoryId,
        latitude: jobDetail.location.latitude,
        longitude: jobDetail.location.longitude,
        take: 5
      };

      searchBusiness(businessQuery, jobDetail.id)
        .then(businessList => {
          // navigation.navigate("TradieFinder");
          this.props.tradieFinder({
            jobId: jobDetail.id,
            businessList: businessList
          });

          toastShow('Search available tradies  Successfully', 'success', 3000);
        })
        .catch(err => {
          toastShow(
            'Search available tradies failed, Please try again.',
            'danger',
            3000
          );
        });
    }

    return (
      <WizardJobForm
        wizardLabel="WizardJobForm"
        onSubmit={(values, dispatch) =>
          this.onSubmit(values, dispatch, navigation)
        }
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    jobDetail: state.JobReducer.jobDetail,
    isJobSubmitted: state.JobReducer.isJobSubmitted
    // page : state.page,
    // form: props.wizardLabel
  };
};

const mapDispatchToProps = {
  tradieFinder,
  submitJobDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobScreen);
