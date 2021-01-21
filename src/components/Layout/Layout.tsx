/* External dependencies */
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import _ from 'lodash'

/* External dependencies */
import browserImage from 'images/browser.jpg'
import mobileImage from 'images/mobile.jpg'
import keyboardImage from 'images/keyboard.jpg'
import * as Styled from './Layout.styled'

interface LayoutProps {
	onUpdate: (element: any) => void
}

export enum Mode {
	Browser = 'browser',
	Mobile = 'mobile',
}

function Layout({ onUpdate }: LayoutProps) {
	const [mode, setMode] = useState(Mode.Browser)
	const [allowMove, setAllowMove] = useState(false)
	const [showKeyboard, setShowKeyboard] = useState(false)

	const browserRef = useRef<HTMLDivElement>(null)
	const documentRef = useRef<HTMLDivElement>(null)
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

				const willChangeWidth =
					browserWidth.current + event.clientX - initialPosition.current
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

	const handleScroll = useMemo(
		() =>
			_.throttle(() => {
				if (!_.isNil(documentRef.current)) {
					onUpdate(documentRef.current)
				}
			}, 50),
		[onUpdate]
	)

	const documentComponent = useMemo(
		() => (
			<Styled.Document ref={documentRef} onScroll={handleScroll}>
				<Styled.InnerDocument mode={mode}>
					{Array.from({ length: 100 }, () => 0).map((_, index) => (
						<Styled.Item key={index} />
					))}
				</Styled.InnerDocument>
			</Styled.Document>
		),
		[handleScroll, mode]
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
				<Styled.Mobile>
					<Styled.MobileBackground src={mobileImage} />
					<Styled.MobileContent>
						{documentComponent}
						{showKeyboard && (
							<Styled.KeyboardWrapper>
								<Styled.Keyboard src={keyboardImage} />
							</Styled.KeyboardWrapper>
						)}
					</Styled.MobileContent>
					<Styled.Input
						placeholder="텍스트 입력"
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
				</Styled.Mobile>
			),
		[
			mode,
			showKeyboard,
			documentComponent,
			handleMouseDown,
			handleFocus,
			handleBlur,
		]
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
				<Styled.Button
					data-mode={Mode.Browser}
					active={mode === Mode.Browser}
					onClick={handleChangeMode}
				>
					Browser
				</Styled.Button>
				<Styled.Button
					data-mode={Mode.Mobile}
					active={mode === Mode.Mobile}
					onClick={handleChangeMode}
				>
					Mobile
				</Styled.Button>
			</Styled.ButtonWrapper>
		</Styled.Container>
	)
}

export default Layout
