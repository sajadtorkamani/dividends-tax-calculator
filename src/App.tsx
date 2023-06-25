import { useReducer } from 'react'
import JsonDump from './components/JsonDump'
import { Calculator, CONSTANTS } from './Calculator'

interface State {
  dividends: string
}

enum ActionType {
  SET_DIVIDENDS = 'SET_DIVIDENDS',
}

type Action = { type: ActionType.SET_DIVIDENDS; payload: string }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SET_DIVIDENDS:
      return { ...state, dividends: action.payload }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { dividends: '10000' })

  const dividends = Number(state.dividends)

  const calculator = new Calculator(dividends)

  return (
    <main className="mx-auto my-6 max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Dividends tax calculator</h1>

      <JsonDump value={state} />

      <div>
        <label htmlFor="dividends" className="block">
          How much dividends did you claim?
        </label>

        <input
          type="text"
          name="dividends"
          value={state.dividends}
          onChange={(event) =>
            dispatch({
              type: ActionType.SET_DIVIDENDS,
              payload: event.target.value,
            })
          }
        />
      </div>

      {!!dividends && (
        <>
          <h2 className="mb-3 mt-7 text-lg font-bold">Results</h2>
          <table>
            <thead>
              <tr>
                <td>Tax payable</td>
                <td>{calculator.getTaxPayable()}</td>
              </tr>

              <tr>
                <td>Taxable amount</td>
                <td>
                  {calculator.getTaxableAmount()} (
                  {CONSTANTS.ANNUAL_DIVIDENDS_ALLOWANCE} free annual allowance)
                </td>
              </tr>

              <tr>
                <td>Gross dividends</td>
                <td>{calculator.getGrossDividends()}</td>
              </tr>
            </thead>
          </table>
        </>
      )}
    </main>
  )
}

export default App
