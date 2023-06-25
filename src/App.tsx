import { useReducer } from 'react'
import JsonDump from './components/JsonDump'
import { Calculator, CONSTANTS } from './lib/Calculator'
import { formatMoney } from './lib/helpers'
import { ActionType, appReducer } from './lib/store'

function App() {
  const [state, dispatch] = useReducer(appReducer, { dividends: '10000' })
  const dividends = Number(state.dividends)
  const calculator = new Calculator(dividends)

  return (
    <main className="mx-auto my-6 max-w-2xl px-4">
      <h1 className="mb-4 text-2xl font-bold">Dividends tax calculator</h1>

      <JsonDump value={state} />

      <div>
        <label htmlFor="dividends" className="block">
          How much dividends did you claim?
        </label>

        <input
          autoFocus
          type="number"
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
          <h2 className="mb-4 mt-8 text-2xl font-bold">Results</h2>
          <table>
            <thead>
              <tr>
                <td>Taxable amount</td>
                <td>
                  <span className="font-bold">
                    {formatMoney(calculator.getTaxableAmount())}{' '}
                  </span>
                  ({formatMoney(CONSTANTS.ANNUAL_DIVIDENDS_ALLOWANCE)} free
                  annual allowance)
                </td>
              </tr>

              <tr>
                <td>Tax rate</td>
                <td className="font-bold">
                  {calculator.getTaxRatePercentage()}%
                </td>
              </tr>

              <tr>
                <td>Tax payable</td>
                <td className="font-bold">
                  {formatMoney(calculator.getTaxPayable())}
                </td>
              </tr>

              <tr>
                <td>Gross dividends</td>
                <td className="font-bold">
                  {formatMoney(calculator.getGrossDividends())}
                </td>
              </tr>
            </thead>
          </table>

          <hr className="my-8" />
          <h2 className="mb-2 text-lg font-bold">Links</h2>

          <ul className="pl-8">
            <li className="list-disc">
              <a href="https://www.gov.uk/tax-on-dividends">Tax on dividends</a>
            </li>
          </ul>
        </>
      )}
    </main>
  )
}

export default App
