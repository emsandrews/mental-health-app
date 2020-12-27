import styled from 'styled-components'
import LoginForm from './LoginForm'

const StyledP = styled.p`
  color: #FFF;
  text-align: center;
`
const StyledHeader = styled.h1`
  color: #FFF;
  text-align: center;

`
const Wrapper = styled.div`
  flex-direction: row;
  display: flex;
  height: 100vh;
`

const LeftPane = styled.div`
  height: 100%;
  width: 50%;
  background: linear-gradient(151.45deg, rgba(255, 139, 160, 0.4) 4.23%, rgba(146, 150, 255, 0.6) 57.67%, #CDCFFE 94.91%);
  align-items: center;
  justify-content: center;
  display: flex;
`
const RightPane = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WomanMeditating = styled.img`
  max-width: 100%;
`



function App() {
  return (
    <Wrapper>
      <LeftPane>
        <WomanMeditating src="/meditating-woman.png" />
      </LeftPane>
      <RightPane> 
        <LoginForm />
      </RightPane>
    </Wrapper>
  );
}

export default App;
