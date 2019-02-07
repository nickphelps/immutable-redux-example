// -----------------------------------------------------------------------------
// Util

const byId = (id) => document.getElementById(id)

const squigglyLine = () => console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

const deepCopy = (x) => JSON.parse(JSON.stringify(x))

// -----------------------------------------------------------------------------
// Render

const counterEl = byId('counterValue')

const render = () => {
  const currentState = getState()
  counterEl.innerHTML = Immutable.get(currentState, 'counter')
  counterEl.style.color = Immutable.get(currentState, 'color')
}

// -----------------------------------------------------------------------------
// Initial Value + Reducer

const initialValue = Immutable.fromJS({
  color: 'blue',
  counter: 0
})

const reducer = (currentState = initialValue, action) => {
  console.assert(Immutable.isImmutable(currentState), 'Redux store should be an Immutable value.')

  let nextState = currentState

  if (action.type === 'ADD') {
    nextState = Immutable.updateIn(currentState, ['counter'], (c) => c + action.value)
  } else if (action.type === 'UPDATE_COLOR') {
    nextState = Immutable.set(currentState, 'color', action.color)
  }

  return nextState
}

// -----------------------------------------------------------------------------
// Create Redux Store

const { createStore } = Redux;

// Initialize the Redux store by passing it our reducer
const { subscribe, dispatch, getState } = createStore(reducer)

// Re-render the application every time the state changes
subscribe(render)

// dispatch an empty 'INIT' event to trigger the first render
dispatch({type: 'INIT'})

// -----------------------------------------------------------------------------
// DOM Events

const addEvents = () => {
  const incrementButton = byId('increment');
  incrementButton.addEventListener('click', () => dispatch({type: 'ADD', value: 1}))

  const decrementButton = byId('decrement')
  decrementButton.addEventListener('click', () => dispatch({type: 'ADD', value: -1}))

  const plusFiveBtn = byId('add5')
  plusFiveBtn.addEventListener('click', () => dispatch({type: 'ADD', value: 5}))

  const minusFiveBtn = byId('minus5')
  minusFiveBtn.addEventListener('click', () => dispatch({type: 'ADD', value: -5}))

  const colorInputEl = byId('colorInput')
  colorInputEl.addEventListener('change', (e) => dispatch({type: 'UPDATE_COLOR', color: e.target.value}))
}

addEvents()
