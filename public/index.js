// -----------------------------------------------------------------------------
// Util
// -----------------------------------------------------------------------------

const byId = (id) => document.getElementById(id)

const squigglyLine = () => console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

const deepCopy = (x) => JSON.parse(JSON.stringify(x))

// -----------------------------------------------------------------------------
// Render
// -----------------------------------------------------------------------------

const counterEl = byId('counterValue')

const render = () => {
  const currentState = getState()
  counterEl.innerHTML = currentState.counter
  counterEl.style.color = currentState.color
}

// -----------------------------------------------------------------------------
// Initial Value + Reducer
// -----------------------------------------------------------------------------

const initialValue = {
  color: 'red',
  counter: 0
}

const reducer = (currentState = initialValue, action) => {
  let newState = deepCopy(currentState)

  if (action.type === 'ADD') {
    newState.counter = currentState.counter + action.value
  } else if (action.type === 'UPDATE_COLOR') {
    newState.color = action.color
  }

  return newState
}

// -----------------------------------------------------------------------------
// Create Redux Store
// -----------------------------------------------------------------------------

const { createStore } = Redux;

// Initialize the Redux store by passing it our reducer
const { subscribe, dispatch, getState } = createStore(reducer)

// Re-render the application every time the state changes
subscribe(render)

// dispatch an empty 'INIT' event to trigger the first render
dispatch({type: 'INIT'})

// -----------------------------------------------------------------------------
// DOM Events
// -----------------------------------------------------------------------------

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
}

addEvents()
