/* External dependencies */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import _ from 'lodash'

/* Internal dependencies */
import {
	EventPropertyType,
	eventProperties,
	validPropertyValues,
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

	const layoutRef = useRef()

	const handleClickProperty = useCallback((property: EventPropertyType) => {
		setCurrentProperty(property)
	}, [])

	const handleUpdate = useCallback(() => {
		const value = getEventPropertyValue(currentProperty.property, layoutRef)
		setPropertyValue(value)
	}, [currentProperty.property])

	const handleChangeMode = useCallback(() => {
		const value = getEventPropertyValue(currentProperty.property, layoutRef)
		setPropertyValue(value)
	}, [currentProperty.property])

	useEffect(() => {
		if (validPropertyValues.includes(currentProperty.property)) {
			const value = getEventPropertyValue(currentProperty.property, layoutRef)
			setPropertyValue(value)
		} else {
			setPropertyValue(null)
		}
	}, [currentProperty.property])

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
				<Styled.PropertyValue>
					{!_.isNil(propertyValue)
						? `${currentProperty.property}: ${propertyValue}`
						: ''}
				</Styled.PropertyValue>
				<Styled.Content>
					<Markdown markdown={currentProperty.description} />
				</Styled.Content>
			</Styled.Description>
			<Styled.Layout>
				<Layout
					onUpdate={handleUpdate}
					onChangeMode={handleChangeMode}
					ref={layoutRef}
				/>
			</Styled.Layout>
		</Styled.Container>
	)
}

export default Description
