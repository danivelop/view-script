/* External dependencies */
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import _ from 'lodash'

/* External dependencies */
import browserImage from 'images/browser.jpg'
import phoneImage from 'images/phone.jpg'
import keyboardImage from 'images/keyboard.jpg'
import * as Styled from './Layout.styled'

enum Mode {
	Browser = 'browser',
	Phone = 'phone',
}

function Layout() {
	const [mode, setMode] = useState(Mode.Phone)
	const [allowMove, setAllowMove] = useState(false)
	const [showKeyboard, setShowKeyboard] = useState(false)

	const browserRef = useRef<HTMLDivElement>(null)
	const initialPosition = useRef(0)
	const browserWidth = useRef(0)

	const handleChangeMode = useCallback((event: any) => {
		setMode(event.target.dataset.mode)
	}, [])

	const handleMouseDown = useCallback((event: React.MouseEvent) => {
		initialPosition.current = event.clientX
		setAllowMove(true)
	}, [])

	const handleMouseMove = useCallback(
		(event: HTMLElementEventMap['mousemove']) => {
			if (!allowMove) return

			window.requestAnimationFrame(() => {
				if (_.isNil(browserRef.current)) return

				const willChangeWidth = browserWidth.current + event.clientX - initialPosition.current
				browserRef.current.style.width = `${willChangeWidth}px`
			})
		},
		[allowMove]
	)

	const handleMouseUp = useCallback(() => {
		if (_.isNil(browserRef.current)) return

		initialPosition.current = 0
		browserWidth.current = browserRef.current.clientWidth
		setAllowMove(false)
	}, [])

	const handleFocus = useCallback(() => {
		setShowKeyboard(true)
	}, [])

	const handleBlur = useCallback(() => {
		setShowKeyboard(false)
	}, [])

	const documentComponent = useMemo(
		() => (
			<Styled.Document>
				{Array.from({ length: 100 }, () => 0).map((_, index) => (
					<Styled.Item key={index} />
				))}
			</Styled.Document>
		),
		[]
	)

	const layoutComponent = useMemo(
		() =>
			mode === Mode.Browser ? (
				<Styled.BrowserWrapper>
					<Styled.Browser ref={browserRef}>
						<Styled.BrowserBackground src={browserImage} />
						<Styled.BrowserContent>{documentComponent}</Styled.BrowserContent>
					</Styled.Browser>
					<Styled.ResizeBar onMouseDown={handleMouseDown} />
				</Styled.BrowserWrapper>
			) : (
				<Styled.Phone>
					<Styled.PhoneBackground src={phoneImage} />
					<Styled.PhoneContent>
						{documentComponent}
						{showKeyboard && (
							<Styled.KeyboardWrapper>
								<Styled.Keyboard src={keyboardImage} />
							</Styled.KeyboardWrapper>
						)}
					</Styled.PhoneContent>
					<Styled.Input placeholder="텍스트 입력" onFocus={handleFocus} onBlur={handleBlur} />
				</Styled.Phone>
			),
		[mode, showKeyboard, documentComponent, handleMouseDown, handleFocus, handleBlur]
	)

	useEffect(() => {
		if (_.isNil(browserRef.current)) return

		browserWidth.current = browserRef.current.clientWidth
	}, [mode])

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)

		return function cleanup() {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [handleMouseMove, handleMouseUp])

	return (
		<Styled.Container>
			{layoutComponent}
			<Styled.ButtonWrapper>
				<Styled.Button data-mode={Mode.Browser} active={mode === Mode.Browser} onClick={handleChangeMode}>
					Browser
				</Styled.Button>
				<Styled.Button data-mode={Mode.Phone} active={mode === Mode.Phone} onClick={handleChangeMode}>
					Phone
				</Styled.Button>
			</Styled.ButtonWrapper>
		</Styled.Container>
	)
}

export default Layout
