import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getGroupNameList} from '../../redux/index';
import {getLocalStorage} from '../../utils/utils';

class dashboard extends React.Component {
  render() {
    const {groupNameList} = this.props;
    const groupNameListRaw = groupNameList.toJS();
    console.log('[dashboard]', groupNameListRaw);
    return (
      <div>
        {
          this.callDefaultRoute(groupNameListRaw)
        }
      </div>
    )
  }

  // 访问默认路由
  callDefaultRoute = (groupNameListRaw) => {
    const selectedItem = getLocalStorage('selectedItem');
    let targetId;
    if (selectedItem) {
      targetId = selectedItem;
    } else {
      const [first = {}] = groupNameListRaw;
      targetId = first.group_id;
    }
    console.log('[targetId]', targetId);
    return (
      targetId
        ? <Redirect to={`/homev2/${targetId}`}/>
        : <Redirect to={`/homev2`}/>
    )
  };
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