/* External dependencies */
import styled, { css } from 'styled-components'

interface PropertyProps {
	active: boolean
}

export const Container = styled.div`
	display: flex;
	justify-content: center;
	padding: 30px 40px;
`

export const Description = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 50px;
`

export const Property = styled.div<PropertyProps>`
	padding: 5px 10px;
	background-color: #f5f5f5;
	word-break: keep-all;
	white-space: nowrap;
	border: 1px solid #c3c3c3;
	border-radius: 6px;
	cursor: pointer;

	${({ active }) =>
		active &&
		css`
			background-color: #d7d7d7;
		`}
`

export const PropertyList = styled.div`
	display: flex;
	width: 700px;
	padding-bottom: 12px;
	overflow-x: scroll;

	${Property} + ${Property} {
		margin-left: 10px;
	}
`

export const PropertyValue = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 40px;
	margin-top: 20px;
	font-size: 24px;
	font-weight: bolder;
`

export const Content = styled.div`
	width: 700px;
	margin-top: 50px;
`

export const Layout = styled.div``
