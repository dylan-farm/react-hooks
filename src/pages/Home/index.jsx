/** @format */

import React, { useRef } from 'react';
import { setModel, useModel } from '@utils/hooksModel';
import LazyLoad from 'react-lazyload';
import Scroll from '@components/common/scroll';
import model from './model';
import style from './index.module.less';

setModel('home', model);

function Home() {
  const listContentRef = useRef();
  const { getToken, token } = useModel('global');
  return (
    <div className={style.wrapper}>
      <Scroll ref={listContentRef} pullUpLoading>
        <div className="content">
          <h1>Home</h1>
          <p>{token}</p>
          <button onClick={getToken} type="button">
            完善
          </button>
          {[1, 2, 3, 11, 12].map(i => (
            <LazyLoad
              placeholder={<img width="100%" height="100%" src={require('@assets/icons/user.png')} alt="music" />}
              key={i}
            >
              <img
                src="http://pic2.zhimg.com/50/v2-f34145b01ab1d5bb463cac35ddc9777d_hd.jpg"
                width="100%"
                height="100%"
                alt="music"
              />
            </LazyLoad>
          ))}
        </div>
      </Scroll>
    </div>
  );
}

export default React.memo(Home);
