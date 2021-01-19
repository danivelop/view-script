/* External dependencies */
import styled, { css } from 'styled-components'

interface ButtonProps {
	active: boolean
}

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 699px;
	height: 700px;
	position: relative;
`

export const BrowserWrapper = styled.div`
	position: relative;
	align-self: flex-start;
`

export const Browser = styled.div`
	width: 699px;
	max-width: 699px;
	height: 418px;
	position: relative;
	overflow: hidden;
	border: 1px solid #eacedf;
`

export const BrowserBackground = styled.img`
	width: 940px;
	transform: translate(-121px, -95px);
`

export const BrowserContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 358px;
	position: absolute;
	top: 62px;
	left: 0;
`

export const ResizeBar = styled.div`
	width: 10px;
	height: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	transform: translateX(50%);
	cursor: col-resize;
`

export const Phone = styled.div`
	width: 306px;
	height: 580px;
	position: relative;
	overflow: hidden;
`

export const PhoneBackground = styled.img`
	width: 680px;
	transform: translate(-186px, -50px);
`

export const PhoneContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 271px;
	height: 470px;
	position: absolute;
	top: 55px;
	left: 18px;
	overflow: hidden;
	box-sizing: border-box;
`

export const Input = styled.input`
	width: 100%;
	height: 30px;
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 0 12px;
	box-sizing: border-box;
	border: 1px solid #dadada;
`

export const KeyboardWrapper = styled.div`
	width: 100%;
	height: 190px;
	overflow: hidden;
`

export const Keyboard = styled.img`
	width: 100%;
`

export const Document = styled.div`
	width: 100%;
	flex: 1;
	overflow-y: auto;
	padding: 10px 20px;
	box-sizing: border-box;
`

export const Item = styled.div`
	width: 100%;
	height: 40px;
	margin-bottom: 10px;
	background-color: #f2f2f2;
	border-radius: 8px;
`

export const ButtonWrapper = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	margin-top: 20px;
	border: 1px solid #cacaca;
	border-radius: 6px;
`

export const Button = styled.div<ButtonProps>`
	display: flex;
	padding: 4px 6px;
	cursor: pointer;

	${({ active }) =>
		active &&
		css`
			background-color: #dcdcdc;
		`}
`
