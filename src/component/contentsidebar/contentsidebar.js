import React from 'react';

// styled-componentd
import {
  SideBar,
  FilterSideBar,
  FilterTitle,
  UnitFilterPin,
  FilterSubTab,
  FilterFieldSet,
  FilterLabel,
  FilterSubTitle,
  ResetButton,
  Main
} from './style';

// antd
import {Icon, Button} from 'antd';

class ContentSideBar extends React.Component {
  state = {
    iconSize: '20px',
    iconMarginRight: 8,
    collapse: false
  };

  render() {
    return (
      <div>
        <SideBar className={this.state.collapse ? 'content-sidebar-small' : 'content-sidebar-large'}>

          <FilterSideBar>
            <FilterTitle>

              <Icon
                type='filter'
                className={this.state.collapse ? 'filter-icon-small' : 'filter-icon-large'}
                onClick={this.handleCollapseClick}
              />

              <span className={this.state.collapse ? 'hidden-span' : ''}>过滤</span>

              <UnitFilterPin className={this.state.collapse ? 'hidden-btn' : ''}>
                <Button size='large' onClick={this.toggleSideBar}>
                  <Icon type="pushpin"/>
                </Button>
              </UnitFilterPin>

            </FilterTitle>

            {/*过滤内容*/}
            <FilterSubTab className={this.state.collapse ? '' : 'expanded'}>

              <FilterFieldSet className={this.state.collapse ? '' : 'pl-16'}>
                <FilterLabel>
                  <FilterSubTitle className={this.state.collapse ? 'sub-title-collapsed' : ''}>状态</FilterSubTitle>
                  <ResetButton className={this.state.collapse ? 'hidden-reset-btn' : 'reset'}
                               onClick={this.resetStatus}>重置</ResetButton>
                </FilterLabel>
              </FilterFieldSet>

              <FilterFieldSet className={this.state.collapse ? '' : 'pl-16'}>
                <FilterLabel>
                  <FilterSubTitle className={this.state.collapse ? 'sub-title-collapsed' : ''}>种类</FilterSubTitle>
                  <ResetButton className={this.state.collapse ? 'hidden-reset-btn' : 'reset'}
                               onClick={this.resetType}>重置</ResetButton>
                </FilterLabel>
              </FilterFieldSet>

            </FilterSubTab>

          </FilterSideBar>

        </SideBar>

        {/*测试*/}
        <Main className='content-large'/>
      </div>
    )
  }

  toggleSideBar = () => {
    this.setState((prevState) => ({
      collapse: !prevState.collapse
    }));
  };

  handleCollapseClick = () => {
    if (this.state.collapse) {
      this.toggleSideBar();
    }
  };

  resetStatus = () => {
    console.log('[重置状态]');
  };

  resetType = () => {
    console.log('[重置种类]');
  };
}

export default ContentSideBar;

/**
 * 1.先写常态的sidebar
 * */