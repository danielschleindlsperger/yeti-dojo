import React, { ReactNode } from 'react'
import { Link, Route, RouteProps, Routes } from 'react-router-dom'
import { Geo } from './01-geolocation/Geo'
import { Battery } from './02-battery/Battery'

const WithChildren: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    const interval = window.setInterval(() => setCount((c) => c + 1), 1000)
    return () => window.clearInterval(interval)
  }, [])
  console.log('rendering <WithChildren />')
  return (
    <div>
      <div>{count}</div>
      <div>{children}</div>
    </div>
  )
}

const Children = () => {
  console.log('rendering <Children />')
  return <div>children</div>
}

function PerformanceChildren() {
  return (
    <div>
      <WithChildren>
        <Children />
      </WithChildren>
    </div>
  )
}

const routes: (RouteProps & { name: string; path: NonNullable<RouteProps['path']> })[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    name: 'Children performance',
    path: '/performance-children',
    element: <PerformanceChildren />,
  },
  {
    name: 'Geolocation',
    path: '/geo',
    element: <Geo />,
  },

  {
    name: 'Battery',
    path: '/battery',
    element: <Battery />,
  },
]

function Home() {
  return (
    <main className="max-w-4xl mx-auto my-16">
      <h1 className="text-7xl font-bold">Home</h1>
      <ul className="mt-8">
        {routes
          .filter((route) => route.path !== '/')
          .map(({ name, ...route }) => (
            <li key={route.path} className="mt-2 first:mt-0">
              <Link
                to={route.path}
                className="text-xl underline decoration-gray-700 decoration-4 font-semibold"
              >
                {name}
              </Link>
            </li>
          ))}
      </ul>
    </main>
  )
}

function App() {
  return (
    <Routes>
      {routes.map(({ name, ...route }) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  )
}

export default App
