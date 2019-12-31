import React from 'react';

import {
    AboutModal,
    AboutModalPic,
    AboutModalText,
    FlexJCenter,
    WhiteLineLeft,
    WhiteLineRight,
    Version,
} from './style';

function BodyAbout(props) {
    return (
        <div>
            <AboutModal>

                <AboutModalPic>

                    <FlexJCenter>
                        <img src={require('../../images/logo_329.png')} alt='' />
                    </FlexJCenter>

                </AboutModalPic>

                <AboutModalText>

                    <WhiteLineLeft></WhiteLineLeft>
                    <Version>版本 0.0.2</Version>
                    <WhiteLineRight></WhiteLineRight>

                </AboutModalText>

            </AboutModal>
        </div>
    )
}

export default BodyAbout;
