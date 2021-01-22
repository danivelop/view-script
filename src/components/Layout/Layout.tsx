/* External dependencies */
import React, {
	useEffect,
	useState,
	useMemo,
	useCallback,
	useRef,
	forwardRef,
	useImperativeHandle,
} from 'react'
import _ from 'lodash'

/* External dependencies */
import browserImage from 'images/browser.jpg'
import mobileImage from 'images/mobile.jpg'
import keyboardImage from 'images/keyboard.jpg'
import * as Styled from './Layout.styled'

interface LayoutProps {
	onUpdate: () => void
}

export enum Mode {
	Browser = 'browser',
	Mobile = 'mobile',
	None = 'none',
}

function Layout({ onUpdate }: LayoutProps, ref: any) {
	const [mode, setMode] = useState(Mode.Browser)
	const [allowMove, setAllowMove] = useState(false)
	const [showKeyboard, setShowKeyboard] = useState(false)

	const windowRef = useRef<HTMLDivElement>(null)
	const documentRef = useRef<HTMLDivElement>(null)
	const elementRef = useRef<HTMLDivElement>(null)
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
				if (_.isNil(windowRef.current)) return

				const willChangeWidth =
					browserWidth.current + event.clientX - initialPosition.current
				windowRef.current.style.width = `${willChangeWidth}px`
				onUpdate()
			})
		},
		[allowMove, onUpdate]
	)

	const handleMouseUp = useCallback(() => {
		if (_.isNil(windowRef.current)) return

		initialPosition.current = 0
		browserWidth.current = windowRef.current.clientWidth
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
				onUpdate()
			}, 50),
		[onUpdate]
	)

	const documentComponent = useMemo(
		() => (
			<Styled.Document ref={documentRef} onScroll={handleScroll}>
				<Styled.InnerDocument mode={mode}>
					{Array.from({ length: 100 }, () => 0).map((_, index) => {
						if (index === 4) {
							return <Styled.Item key={index} ref={elementRef} active />
						}
						return <Styled.Item key={index} />
					})}
				</Styled.InnerDocument>
			</Styled.Document>
		),
		[handleScroll, mode]
	)

	const layoutComponent = useMemo(() => {
		if (mode === Mode.Browser) {
			return (
				<Styled.BrowserWrapper>
					<Styled.Browser ref={windowRef}>
						<Styled.BrowserBackground src={browserImage} />
						<Styled.BrowserContent>{documentComponent}</Styled.BrowserContent>
					</Styled.Browser>
					<Styled.ResizeBar onMouseDown={handleMouseDown} />
				</Styled.BrowserWrapper>
			)
		}
		if (mode === Mode.Mobile) {
			return (
				<Styled.Mobile>
					<Styled.MobileBackground src={mobileImage} />
					<Styled.MobileContent ref={windowRef}>
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
			)
		}
		return <Styled.None>{documentComponent}</Styled.None>
	}, [
		mode,
		showKeyboard,
		documentComponent,
		handleMouseDown,
		handleFocus,
		handleBlur,
	])

	useEffect(() => {
		if (_.isNil(windowRef.current)) return

		browserWidth.current = windowRef.current.clientWidth
	}, [mode])

	useEffect(() => {
		onUpdate()
	}, [mode, showKeyboard, onUpdate])

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)

		return function cleanup() {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [handleMouseMove, handleMouseUp])

	useImperativeHandle(ref, () => ({
		documentRef,
		windowRef,
		elementRef,
	}))

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
				<Styled.Button
					data-mode={Mode.None}
					active={mode === Mode.None}
					onClick={handleChangeMode}
				>
					None
				</Styled.Button>
			</Styled.ButtonWrapper>
		</Styled.Container>
	)
}

export default forwardRef(Layout)
