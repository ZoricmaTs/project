import './App.css'
import {Header} from './widgets/header';

function App() {
  return (
    <>
      <div className={'scene'}>
        <Header/>

        {/*<div className={'background-silk'}>*/}
        {/*  <Silk*/}
        {/*    speed={5}*/}
        {/*    scale={1}*/}
        {/*    color="#4a2367"*/}
        {/*    noiseIntensity={0.6}*/}
        {/*    rotation={0}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className={'background-silk'}>
        </div>
      </div>
    </>
  )
}

export default App
