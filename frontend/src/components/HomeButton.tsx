import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";

export default function HomeButton() {
    const navigate = useNavigate();
    return (

        <StyledButton type={"button"} onClick={() => navigate("/")}>Home</StyledButton>
    )
}

const StyledButton = styled.button`
  background-color: lightblue;
  position: fixed;
  top: 0;
  left: 0;
  margin: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #242424;
`;