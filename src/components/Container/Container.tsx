/* External dependencies */
import React, { useState, useCallback, useEffect } from 'react'
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

	const handleClickProperty = useCallback((property: EventPropertyType) => {
		setCurrentProperty(property)
	}, [])

	const handleUpdate = useCallback(
		(element: any) => {
			const value = getEventPropertyValue(element, currentProperty.property)
			setPropertyValue(value)
		},
		[currentProperty.property]
	)

	useEffect(() => {
		if (validPropertyValues.includes(currentProperty.property)) {
			setPropertyValue(0)
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
				<Layout onUpdate={handleUpdate} />
			</Styled.Layout>
		</Styled.Container>
	)
}

export default Description
