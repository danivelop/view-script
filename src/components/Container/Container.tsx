/* External dependencies */
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import _ from 'lodash'

/* Internal dependencies */
import {
	EventPropertyType,
	eventProperties,
	getEventPropertyValue,
} from 'constants/EventProperty'
import Layout from 'components/Layout'
import Markdown from 'components/Markdown'
import * as Styled from './Container.styled'

function Description() {
	const [currentProperty, setCurrentProperty] = useState<EventPropertyType>(
		eventProperties[0]
	)
	const [propertyValue, setPropertyValue] = useState<any>()
	const [observerValue, setObserverValue] = useState('')

	const layoutRef = useRef()

	const handleClickProperty = useCallback((property: EventPropertyType) => {
		setCurrentProperty(property)
	}, [])

	const handleUpdate = useCallback(() => {
		const value = getEventPropertyValue(currentProperty.property, layoutRef)
		setPropertyValue(value)
	}, [currentProperty.property])

	const PropertyValueComponent = useMemo(() => {
		if (currentProperty.property === 'IntersectionObserver') {
			return observerValue
		}
		if (_.isNil(propertyValue)) {
			return null
		}

		if (!_.isArray(propertyValue)) {
			return `${currentProperty.property}: ${propertyValue}`
		}

		return propertyValue.map((value) => <div key={value}>{value}</div>)
	}, [currentProperty.property, observerValue, propertyValue])

	useEffect(() => {
		const value = getEventPropertyValue(currentProperty.property, layoutRef)
		setPropertyValue(value)

		const interval = setInterval(() => {
			const value = getEventPropertyValue(currentProperty.property, layoutRef)
			setPropertyValue(value)
		}, 500)

		return function cleanup() {
			clearInterval(interval)
		}
	}, [currentProperty.property])

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setObserverValue(entry.isIntersecting ? '나타남' : '사라짐')
			},
			{
				// @ts-ignore
				root: layoutRef.current.documentRef.current,
				threshold: 0.0,
			}
		)

		// @ts-ignore
		observer.observe(layoutRef.current.elementRef.current)

		return function cleanup() {
			observer.disconnect()
		}
	}, [])

	return (
		<Styled.Container>
			<Styled.Description>
				<Styled.PropertyList>
					{eventProperties.map((property) => (
						<Styled.Property
							key={property.property}
							active={property.property === currentProperty.property}
							onClick={() => handleClickProperty(property)}
						>
							{property.property}
						</Styled.Property>
					))}
				</Styled.PropertyList>
				<Styled.PropertyValue>{PropertyValueComponent}</Styled.PropertyValue>
				<Styled.Content>
					<Markdown markdown={currentProperty.description} />
				</Styled.Content>
			</Styled.Description>
			<Styled.Layout>
				<Layout onUpdate={handleUpdate} ref={layoutRef} />
			</Styled.Layout>
		</Styled.Container>
	)
}

export default Description
