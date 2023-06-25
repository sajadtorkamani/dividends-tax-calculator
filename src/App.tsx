import { useMemo, useReducer } from 'react'
import JsonDump from './components/JsonDump'

interface State {
  dividends: string
}

enum ActionType {
  SET_DIVIDENDS = 'SET_DIVIDENDS',
}

type Action = { type: ActionType.SET_DIVIDENDS; payload: string }

const TAX_RATES = {
  basic: 0.0875,
  higher: 0.3375,
  additional: 0.3935,
}

const ANNUAL_DIVIDENDS_ALLOWANCE = 1000

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

  // https://www.gov.uk/tax-on-dividends
  function getTaxRate() {
    if (dividends > 125140) {
      return TAX_RATES.additional
    }

    return dividends > 50271 ? TAX_RATES.higher : TAX_RATES.basic
  }

  const taxRate = getTaxRate()
  const taxableAmount = Math.max(dividends - ANNUAL_DIVIDENDS_ALLOWANCE, 0)
  const taxPayable = taxableAmount * taxRate
  const grossDividends = dividends - taxPayable

  return (
    <main className="mx-auto my-6 max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Dividends tax calculator</h1>

      <JsonDump value={state} />

      <div className="mb-6">
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
        <table>
          <thead>
            <tr>
              <td>Tax payable</td>
              <td>{taxPayable}</td>
            </tr>

            <tr>
              <td>Gross dividends</td>
              <td>{grossDividends}</td>
            </tr>
          </thead>
        </table>
      )}
    </main>
  )
}

export default App
