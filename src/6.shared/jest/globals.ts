import { useEffect } from 'react'

jest.mock('react', () => {
  const moduleMock = jest.requireActual('react')

  return {
    ...moduleMock,
    useEffect: jest.fn(),
    useCallback: jest.fn(),
    useState: jest.fn(),
    useMemo: jest.fn(factory => factory()),
    useRef: jest.fn(ref => ref),
  }
})

export const mockUseEffect = useEffect as jest.MockedFunction<typeof useEffect>

export const mockV4ReturnValue = 'v4-new-id'
jest.mock('uuid', () => ({ v4: jest.fn(() => mockV4ReturnValue) }))

jest.mock('react-dnd', () => {
  const moduleMock = jest.requireActual('react-dnd')

  return {
    ...moduleMock,
    useDrag: jest.fn(),
    useDrop: jest.fn(),
  }
})
