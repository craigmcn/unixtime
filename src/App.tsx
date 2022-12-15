import React from 'react';
import useConversion from './lib/hooks/useConversion';
import Header from './components/Header/Header';
import Main from './components/Shared/Main';
import Form from './components/Converter/Form';
import Result from './components/Converter/Result';

function App() {
  const { data, setConversion } = useConversion();

  return (
    <>
      <Header />

      <Main title="Convert a date and time">
        <Form setConversion={ setConversion } />
        <Result data={ data } />
      </Main>
    </>
  );
}

export default App;
