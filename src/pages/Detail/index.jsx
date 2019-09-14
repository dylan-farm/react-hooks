/** @format */

import React from 'react';
import { setModel, useModel } from '@utils/hooksModel';
import model from './model';
import './index.less';

setModel('detail', model); // Must initialize the model first

function Home() {
  const { setName } = useModel('detail'); // Use own model
  return (
    <>
      <h1>Detail</h1>
      <footer>
        <button onClick={setName} type="button">
          Toggle name
        </button>
      </footer>
    </>
  );
}
export default Home;
