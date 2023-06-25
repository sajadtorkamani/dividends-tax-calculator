import computerImageUrl from './assets/computer.png'

function App() {
  return (
    <main className="mx-auto my-6 max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Let's write</h1>
      <img
        src={computerImageUrl}
        alt="Computer"
        style={{ maxWidth: '400px' }}
      />
    </main>
  )
}

export default App
