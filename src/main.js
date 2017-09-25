import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Switch, // for server rendering
    Route,
    Link
    // etc.
} from 'react-router-dom';
import styles from './scss/styles.scss';
// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const MusicAPI = {
  music: [
    { bpm: 1, artist: "SRV", genre: "x" },
    { bpm: 2, artist: "GD", genre: "y" },
    { bpm: 3, artist: "TC", genre: "z" },
    { bpm: 4, artist: "DC", genre: "xx" },
    { bpm: 5, artist: "BG", genre: "yy" },
    { bpm: 6, artist: "BW", genre: "zz" }
  ],
  all: function() { return this.music},
  get: function(id) {
    const isMusician = a => a.genre === id
    return this.music.find(isMusician)
  }
}

// The Collection iterates over all of the music and creates
// a link to their profile page.
const Collection = () => (
  <div>
    <ul>
      {
        MusicAPI.all().map(a => (
          <li key={a.genre}>
            <Link to={`/list/${a.bpm}`}>{a.artist}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

const Artist = (props) => {
  const Artist = MusicAPI.get(
    parseInt(props.match.params.bpm, 10)
  )
  if (!Artist) {
    return <div>Sorry, but the Artist was not found</div>
  }
  return (
    <div>
      <h1>{Artist.artist} (#{Artist.bpm})</h1>
      <h2>Genre: {Artist.genre}</h2>
      <Link to='/list'>Back</Link>
    </div>
  )
}

// The List component matches one of two different routes
// depending on the full pathartist
const List = () => (
  <Switch>
    <Route exact path='/list' component={Collection}/>
    <Route path='/list/:bpm' component={Artist}/>
  </Switch>
)

const Case = () => (
  <div>
    <ul>
      <li>Big black one</li>
      <li>Big blue one</li>
      <li>Big brown one</li>
    </ul>
  </div>
)

const Home = () => (
  <div>
    <h1>Your music collection</h1>
  </div>
)

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /list
// and /schedule routes will match any pathartist that starts
// with /list or /case. The / route will only match
// when the pathartist is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/list' component={List}/>
      <Route path='/schedule' component={Case}/>
    </Switch>
  </main>
)

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/list'>List</Link></li>
        <li><Link to='/schedule'>Case</Link></li>
      </ul>
    </nav>
  </header>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('mount'))
