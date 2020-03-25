/* eslint-disable no-unused-vars */
import React from 'react';

// 自定义组件
import Unitnavbar from '../unitnavbar/unitnavbar';

// styled-components
import {
  UnitUploadLayout,
  UnitFileUploadLayout,
  FileUploadHeaderGrid
} from './style';

class UnitFileUpload extends React.Component {
  render() {
    const {text} = this.props;
    return (
      <UnitUploadLayout>
        UnitFileUpload
        {/*<UnitFileUploadLayout>*/}

          {/*<FileUploadHeaderGrid>*/}
            {/*<UnitNavbar text={text}/>*/}
          {/*</FileUploadHeaderGrid>*/}

          {/*/!*...*!/*/}

        {/*</UnitFileUploadLayout>*/}
      </UnitUploadLayout>
    )
  }
}

export default UnitFileUpload;