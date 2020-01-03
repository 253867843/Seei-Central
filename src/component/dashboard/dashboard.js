import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getGroupNameList} from '../../redux/index';
import {getRouteParams} from '../../utils/utils';

class dashboard extends React.Component {
  render() {
    const {groupNameList} = this.props;
    const groupNameListRaw = groupNameList.toJS();
    // console.log('[dashboard]', groupNameListRaw);
    return (
      <Redirect to={getRouteParams(groupNameListRaw)('/homev2')}/>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    groupNameList: getGroupNameList(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);