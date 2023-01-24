import React, {useState} from 'react'
import styled from 'styled-components'
import Resume from './components/Resume'
import ResumeBuilder from './components/ResumeViewer'

const App = () => {

  const [showComponent, setShowComponent] = useState(false)

  const toggleComponent = () => {
    console.log('toggle')
    setShowComponent(!showComponent)
  }

  const Toolbar = () => {
    return (
      <ToolbarWrapper>
        <button onClick={toggleComponent}>Toggle</button>
      </ToolbarWrapper>
    )
  }
  
  return (
    
    <Container>
      <Toolbar />
      <Spacer />
      {
        showComponent?
        <Container>
          <Resume />
        </Container>
        :<Container>
          <ResumeBuilder />
        </Container>
        // Component
      }
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
`
const ToolbarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* width: 100%; */
  background-color: rgba(0,0,0,0.1);
  padding: 10px;
`
const Spacer = styled.div`
  height: 40px;
  width: 100%;
`

export default App;
