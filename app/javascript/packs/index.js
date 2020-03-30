import React from 'react';
import { render } from 'react-dom';

// Apollo Client
import Provider from '../components/Provider';
import Blog from '../components/Blog';

document.addEventListener('DOMContentLoaded', () => {
  const mountingPoint = document.getElementById('root');

  if (mountingPoint) {
    render(
      <Provider>
        <Blog />
      </Provider>,
      mountingPoint
    );
  }
});
