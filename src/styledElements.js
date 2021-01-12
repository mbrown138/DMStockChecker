
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const Flexbox = styled.div`
  display:flex;
  flex-wrap:wrap;
  min-width:275px;`

const Input = styled.input`
  margin:1em;`

const StyledButton = styled(Button)`
  margin:1em;`

export {Flexbox, Input, StyledButton};