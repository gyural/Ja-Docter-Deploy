import React, {useState} from 'react'
import styled from "styled-components"
import kakao_signup from "../../images/kakao_signup.png"
import naver_signup from "../../images/naver_signup.png"
import Button from './Button'
import { register } from '../../APIs/Auth'

const Container = styled.div`
    border: 2px solid #7D7C7C;
    width: 500px;
    height: 530px;
    padding: 10px;
    border-radius: 14px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ButtonWrapper = styled.div`
  &:hover {
    background-color: #ddd0c3;
  }
`;
const Input = styled.input`
    padding: 4px;
    font-size: 18px;
    display: block;
    width: 440px;
    height: 47px;
    border: 2px solid #7D7C7C;
    border-radius: 10px;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
    &::placeholder {
        font-size: 12px;
    }
`;

const TitleWrapper = styled.div`
  color: #F0790A;
  font-size: 48px;
  margin-bottom: 28px;
`

const LineWrapper = styled.div`
  position: relative;
  height: 4px;
  width: 100%;
  margin-bottom: 24px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  content: "1";

`;

const TextBox = styled.div`
  width: 80px;
  background-color: #fff;
  position: absolute;
  z-index: 1;
  text-align: center;
  left: 41%;
  bottom: -6px;
`;
function SignupCard(props) {
    const handleMode = props.handleMode
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        check_password: "",
        email: "",
    });


    const handleSubmit = () => {
        //여기에 form 데이터를 서버로 제출하는 로직을 작성하고
        //임시로 콘솔창에 출력하겠습니다.
        if (formData.check_password === formData.password) {
            console.log(formData);
            if (register(formData.id, formData.password)) {
                // navigate("/signin");
                // alert('회원가입 성공!!!')
            }
        } else {
            alert("비밀번호 재확인이 일치하지 않습니다.");
        }
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "isChecked") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };
    return (
        <Container>

          <TitleWrapper>
            회원가입
          </TitleWrapper>
            <form>
                <Input
                    type="text"
                    name="id"
                    value={formData.id}
                    placeholder="이메일을 입력해주세요"
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="check_password"
                    placeholder="비밀번호를 재입력해주세요"
                    value={formData.check_password}
                    onChange={handleChange}
                />
                {/* <Input
                    type="email"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    value={formData.password}
                    onChange={handleChange}
                /> */}
            </form>

            <ButtonWrapper
                style={{
                    width: "91%",
                    borderRadius: '24px',
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "85px",
                    // border: '4px solid red',
                    backgroundColor: '#F0790A',
                    margin: "16px 0",
                }}
            >
                <Button
                    style={{
                        marginLeft: "20px",
                        position: "absolute",
                        left: "10px",
                        top: "10px", // 버튼을 아래로 이동시킴
                        
                    }}
                    title={" 회원가입 "}
                    bgcolor={"#F0790A"}
                    color={"#ffffff"}
                    onClick={()=>{
                        handleSubmit()
                        handleMode()
                    }}
                    radius = {24}
                    shadow = {false}
                    hover = {false}
                />
            </ButtonWrapper>
            
            <LineWrapper>
              <Line></Line>
              <TextBox>또는</TextBox>
            </LineWrapper>
            <div className="social-signup">
                <a
                    className="kakao-signup"
                    href="javascript:void(0)"
                    style={{
                        display: "block",
                        width: "440px",
                        height: "54px",
                        backgroundImage: `url(${kakao_signup})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "25px",
                        marginBottom: "18px",
                    }}
                ></a>
                <a
                    className="naver-login"
                    href="javascript:void(0)"
                    style={{
                        backgroundColor: "#02C75A",
                        display: "block",
                        width: "440px",
                        height: "54px",
                        backgroundImage: `url(${naver_signup})`,
                        // backgroundSize: '340px 60px',
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "25px",
                    }}
                ></a>
            </div>
        </Container>
    );
}

export default SignupCard;
